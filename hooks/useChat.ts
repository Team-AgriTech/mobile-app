import { useState } from 'react';
import { apiService } from '@/services/api';
import { getDeviceId } from '@/utils/deviceInfo';
import { StationData } from '@/services/types';

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

  const sendMessage = async (message: string): Promise<void> => {
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

      // Get device ID and send to API
      const deviceId = await getDeviceId();
      const response = await apiService.sendChatMessage(deviceId, message);

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
    // Get latest 10 data points
    const latestData = stationData.slice(-10);
    
    // Create a message with station data
    const dataMessage = `Please analyze my farm data: ${JSON.stringify(latestData.map(data => ({
      device_id: data.device_id,
      timestamp: data.timestamp,
      temperature: data.data.temperature,
      humidity: data.data.humidity,
      soil_moisture: data.data.soil_moisture,
      ph_value: data.data.ph_value,
      gas_level: data.data.gas_level,
      light_intensity: data.data.light_intensity,
      prediction: data.prediction
    })))}`;

    await sendMessage(dataMessage);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    sendStationDataQuery,
    clearChat
  };
}