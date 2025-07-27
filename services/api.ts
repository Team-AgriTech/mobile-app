import { StationData } from './types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://agri-tech-backend-6wwy.onrender.com';
const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK === 'true' || false;

class ApiService {
  async getStationData(): Promise<StationData[]> {
    if (USE_MOCK_DATA) {
      // Return mock data for testing
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [];
    }

    try {
      const response = await fetch(`${API_BASE_URL}/get_all_data`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: StationData[] = await response.json();
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch station data');
    }
  }

  async getCurrentData(): Promise<StationData[] | StationData | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/get_current_data`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data; // Return as-is, let the hook handle array vs object
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch current data');
    }
  }

  async getStationById(stationId: string): Promise<StationData | null> {
    const allStations = await this.getStationData();
    return allStations.find(station => station.device_id === stationId) || null;
  }

  // New method to get unique stations from historical data
  async getUniqueStations(): Promise<string[]> {
    const allData = await this.getStationData();
    const uniqueStations = [...new Set(allData.map(station => station.device_id))];
    return uniqueStations;
  }

  // Get historical data for a specific station
  async getHistoricalDataForStation(stationId: string): Promise<StationData[]> {
    const allData = await this.getStationData();
    return allData.filter(station => station.device_id === stationId);
  }

  // New chat API method
  async sendChatMessage(deviceId: string, message: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: deviceId,
          message: message
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Response is markdown text
      const markdownResponse = await response.text();
      return markdownResponse;
    } catch (error) {
      console.error('Chat API Error:', error);
      throw new Error('Failed to send chat message');
    }
  }
}

export const apiService = new ApiService();