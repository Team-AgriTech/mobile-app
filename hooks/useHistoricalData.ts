import { useState, useEffect } from 'react';
import { StationData } from '@/services/types';
import { apiService } from '@/services/api';

export function useHistoricalData(stationId: string) {
  const [historicalData, setHistoricalData] = useState<StationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoricalData = async () => {
    if (!stationId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getHistoricalDataForStation(stationId);
      // Sort by timestamp to ensure chronological order
      const sortedData = data.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      setHistoricalData(sortedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [stationId]);

  return {
    historicalData,
    loading,
    error,
    refresh: fetchHistoricalData
  };
}