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
      
      // Get all station data and find the most recent one
      const allStationData = await apiService.getStationData();
      
      if (!Array.isArray(allStationData) || allStationData.length === 0) {
        setError('No station data available');
        return;
      }

      // Sort by timestamp and get the most recent data
      const sortedData = allStationData.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      const mostRecentData = sortedData[0];
      
      if (mostRecentData && mostRecentData.data) {
        setCurrentData(mostRecentData);
        
        // Get unique stations from the same data source
        const stationIds = [...new Set(allStationData.map(station => station.device_id))];
        setUniqueStations(stationIds);
        
        setLastUpdated(new Date());
        
        console.log('Updated with most recent data:', {
          stationId: mostRecentData.device_id,
          timestamp: mostRecentData.timestamp,
          temperature: mostRecentData.data.temperature
        });
      } else {
        setError('Invalid data format received from API');
      }
      
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