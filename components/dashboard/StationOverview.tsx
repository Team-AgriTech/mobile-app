import { GraphCard } from '@/components/dashboard/Chart';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useHistoricalData } from '@/hooks/useHistoricalData';
import { StationData } from '@/services/types';
import { SensorEvaluator } from '@/utils/sensorEvaluator';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { InsightCard } from './InsightCard';

interface StationOverviewProps {
  currentStationData: StationData;
  stationId: string;
}

export function StationOverview({ currentStationData, stationId }: StationOverviewProps) {
  // Get historical data for charts
  const { historicalData, loading: historyLoading } = useHistoricalData(stationId);

  const handleConsultAI = async () => {
    // Navigate to chat tab and pass station data
    router.push({
      pathname: '/chat',
      params: {
        stationData: JSON.stringify(historicalData.slice(-10)),
        currentData: JSON.stringify(currentStationData)
      }
    });
  };

  // Evaluate sensor data using current data for insights
  const temperatureInsight = SensorEvaluator.evaluateTemperature(currentStationData.data.temperature);
  const humidityInsight = SensorEvaluator.evaluateHumidity(currentStationData.data.humidity);
  const phInsight = SensorEvaluator.evaluatePH(currentStationData.data.ph_value);
  const moistureInsight = SensorEvaluator.evaluateSoilMoisture(currentStationData.data.soil_moisture);
  const gasInsight = SensorEvaluator.evaluateGasLevel(currentStationData.data.gas_level);
  const lightInsight = SensorEvaluator.evaluateLightIntensity(currentStationData.data.light_intensity);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stationInfo}>
          <ThemedText type="title" style={styles.stationTitle}>
            {currentStationData.device_id}
          </ThemedText>
          <ThemedText style={styles.timestamp}>
            Updated: {new Date(currentStationData.timestamp).toLocaleString()}
          </ThemedText>
          <ThemedText style={styles.prediction}>
            Prediction Score: {currentStationData.prediction}%
          </ThemedText>
        </View>
        
        <TouchableOpacity 
          style={styles.aiButton}
          onPress={handleConsultAI}
        >
          <Ionicons name="sparkles" size={16} color="white" />
          <ThemedText style={styles.aiButtonText}>Consult AI</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Chart with historical data */}
      <GraphCard 
        historicalData={historicalData} 
        loading={historyLoading}
        stationId={stationId}
      />

      {/* Insight cards based on current data */}
      <View style={styles.grid}>
        <InsightCard
          title="Temperature"
          value={`${temperatureInsight.value}°C`}
          message={temperatureInsight.message}
          icon="thermometer-outline"
          type={temperatureInsight.status}
        />
        
        <InsightCard
          title="Humidity"
          value={`${humidityInsight.value}%`}
          message={humidityInsight.message}
          icon="rainy-outline"
          type={humidityInsight.status}
        />
        
        <InsightCard
          title="pH Level"
          value={`${phInsight.value}`}
          message={phInsight.message}
          icon="water-outline"
          type={phInsight.status}
        />
        
        <InsightCard
          title="Soil Moisture"
          value={`${moistureInsight.value}`}
          message={moistureInsight.message}
          icon="earth-outline"
          type={moistureInsight.status}
        />
        
        <InsightCard
          title="Air Quality"
          value={`${gasInsight.value} ppm`}
          message={gasInsight.message}
          icon="leaf-outline"
          type={gasInsight.status}
        />

        <InsightCard
          title="Light Intensity"
          value={`${lightInsight.value} lux`}
          message={lightInsight.message}
          icon="sunny-outline"
          type={lightInsight.status}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stationInfo: {
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  prediction: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    color: '#007AFF',
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  aiButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 12,
  },
  stationTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});