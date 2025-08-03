import { useHistoricalData } from '@/hooks/useHistoricalData';
import { StationData } from '@/services/types';
import { useEffect, useState } from 'react';

export function useCurrentStationData(refreshInterval: number = 30000) {
  const [currentData, setCurrentData] = useState<StationData | null>(null);
  const [uniqueStations, setUniqueStations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Get historical data for the station (assuming single station for now)
  // You can pass the station ID here - for now using a default or get from API
  const { historicalData, loading: historyLoading, error: historyError } = useHistoricalData('station-01');

  useEffect(() => {
    if (historyLoading) {
      setLoading(true);
      return;
    }

    if (historyError) {
      setError(historyError);
      setLoading(false);
      return;
    }

    if (historicalData && historicalData.length > 0) {
      // Sort by timestamp and get the most recent data (latest first)
      const sortedData = [...historicalData].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      const mostRecentData = sortedData[0];
      
      setCurrentData(mostRecentData);
      
      // Get unique stations from historical data
      const stationIds = [...new Set(historicalData.map(station => station.device_id))];
      setUniqueStations(stationIds);
      
      setLastUpdated(new Date());
      setError(null);
      
      console.log('✅ Updated with LATEST HISTORICAL data:', {
        stationId: mostRecentData.device_id,
        timestamp: mostRecentData.timestamp,
        temperature: mostRecentData.data.temperature,
        totalDataPoints: historicalData.length,
        fetchTime: new Date().toISOString()
      });
    } else {
      setError('No historical data available');
    }
    
    setLoading(false);
  }, [historicalData, historyLoading, historyError]);

  const refresh = () => {
    // The refresh will be handled by the historical data hook
    setLastUpdated(new Date());
  };

  return {
    currentData,
    uniqueStations,
    loading,
    error,
    lastUpdated,
    refresh
  };
}