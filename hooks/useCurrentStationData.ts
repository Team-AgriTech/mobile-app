import { apiService } from '@/services/api';
import { StationData } from '@/services/types';
import { useEffect, useState } from 'react';

export function useCurrentStationData(refreshInterval: number = 30000) {
  const [currentData, setCurrentData] = useState<StationData | null>(null);
  const [uniqueStations, setUniqueStations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchCurrentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get current data for insights
      const response = await apiService.getCurrentData();
      
      // Handle the case where API returns an array instead of a single object
      let current: StationData | null = null;
      
      if (Array.isArray(response)) {
        // API returned an array, take the first item
        current = response.length > 0 ? response[0] : null;
      } else {
        // API returned a single object
        current = response;
      }
      
      if (current && current.data) {
        setCurrentData(current);
      } else {
        setError('Invalid data format received from API');
        return;
      }
      
      // Get unique stations list
      const stations = await apiService.getUniqueStations();
      setUniqueStations(stations);
      
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error fetching current data:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentData();
    
    // Set up auto-refresh
    const interval = setInterval(fetchCurrentData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return {
    currentData,
    uniqueStations,
    loading,
    error,
    lastUpdated,
    refresh: fetchCurrentData
  };
}