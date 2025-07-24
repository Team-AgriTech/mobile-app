import { useState, useEffect } from 'react';
import { StationData } from '@/services/types';
import { apiService } from '@/services/api';

export function useStationData(refreshInterval: number = 30000) {
  const [data, setData] = useState<StationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const stationData = await apiService.getStationData();
      setData(stationData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up auto-refresh
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh: fetchData
  };
}