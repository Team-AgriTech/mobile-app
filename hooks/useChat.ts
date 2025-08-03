import { useLanguage } from '@/contexts/LanguageContext';
import { apiService } from '@/services/api';
import { StationData } from '@/services/types';
import { getDeviceId } from '@/utils/deviceInfo';
import { useState } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { language, t } = useLanguage();

  // Generate a new conversation ID
  const generateConversationId = async (): Promise<string> => {
    const baseDeviceId = await getDeviceId();
    const timestamp = Date.now();
    return `${baseDeviceId}-${timestamp}`;
  };

  const sendMessage = async (message: string, resetContext: boolean = false): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Add user message to chat
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: message,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      // Generate conversation ID if needed or if reset requested
      let currentConversationId = conversationId;
      if (!currentConversationId || resetContext) {
        currentConversationId = await generateConversationId();
        setConversationId(currentConversationId);
      }

      const response = await apiService.sendChatMessage(currentConversationId, message);

      // Add AI response to chat
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const sendStationDataQuery = async (stationData: StationData[]): Promise<void> => {
    // Get latest 2 data points (reduced even further to save tokens)
    const latestData = stationData.slice(-2);
    
    // Create messages in the appropriate language
    const summary = latestData.map((data, index) => {
      const date = new Date(data.timestamp).toLocaleDateString();
      
      if (language === 'ne') {
        return `रिडिंग ${index + 1} (${date}):
तापक्रम: ${data.data.temperature}°C, आर्द्रता: ${data.data.humidity}%, माटो: ${data.data.soil_moisture}, pH: ${data.data.ph_value}, हावा: ${data.data.gas_level}ppm, प्रकाश: ${data.data.light_intensity}lux, स्कोर: ${data.prediction}%`;
      } else {
        return `Reading ${index + 1} (${date}):
Temp: ${data.data.temperature}°C, Humidity: ${data.data.humidity}%, Soil: ${data.data.soil_moisture}, pH: ${data.data.ph_value}, Air: ${data.data.gas_level}ppm, Light: ${data.data.light_intensity}lux, Score: ${data.prediction}%`;
      }
    }).join('\n');

    const dataMessage = language === 'ne' 
      ? `Please talk in nepali I don't understand english मेरो खेतीको डाटा विश्लेषण गर्नुहोस् ${latestData[0]?.device_id} बाट:

${summary}

कृपया बालीको स्वास्थ्य र सिफारिसहरूमा संक्षिप्त जानकारी प्रदान गर्नुहोस्।`
      : `Analyze my farm data from ${latestData[0]?.device_id}:

${summary}

Please provide brief insights on crop health and recommendations.`;

    await sendMessage(dataMessage);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    setConversationId(null); // Reset conversation ID to start fresh
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    sendStationDataQuery,
    clearChat,
    conversationId
  };
}