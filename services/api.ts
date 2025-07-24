import { ApiResponse, StationData } from './types';
import { mockStationData } from './mockData';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://your-api-endpoint.com';
const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK === 'true' || true;

class ApiService {
  async getStationData(): Promise<StationData[]> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockStationData;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/stations/data`);
      const result: ApiResponse = await response.json();
      
      if (result.status === 'success') {
        return result.data;
      }
      throw new Error(result.message || 'API Error');
    } catch (error) {
      console.error('API Error:', error);
      // Fallback to mock data
      return mockStationData;
    }
  }

  async getStationById(stationId: string): Promise<StationData | null> {
    const allStations = await this.getStationData();
    return allStations.find(station => station.station_id === stationId) || null;
  }
}

export const apiService = new ApiService();