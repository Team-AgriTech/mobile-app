import { useState } from 'react';
import { AIInsightResponse, StationData } from '@/services/types';
import { aiService } from '@/services/aiService';

export function useAIInsights() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getInsights = async (stationData: StationData): Promise<AIInsightResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await aiService.getAIInsights({
        station_id: stationData.station_id,
        station_data: stationData
      });
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get AI insights';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getInsights,
    loading,
    error
  };
}