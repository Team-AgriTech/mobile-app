import { GraphCard } from '@/components/dashboard/Chart';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHistoricalData } from '@/hooks/useHistoricalData';
import { StationData } from '@/services/types';
import { SensorEvaluator } from '@/utils/sensorEvaluator';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { InsightCard } from './InsightCard';

const { width: screenWidth } = Dimensions.get('window');

interface StationOverviewProps {
  currentStationData: StationData;
  stationId: string;
}

// Risk level configuration
const RISK_LEVELS = {
  0: { text: "No Risk", color: "#2196F3", emoji: "🔵" },
  1: { text: "Low Risk", color: "#4CAF50", emoji: "🟢" },
  2: { text: "Moderate Risk", color: "#FF9800", emoji: "🟡" },
  3: { text: "High Risk", color: "#FF5722", emoji: "🟠" },
  4: { text: "Extreme Risk", color: "#F44336", emoji: "🔴" }
};

export function StationOverview({ currentStationData, stationId }: StationOverviewProps) {
  const { t } = useLanguage();
  const { historicalData, loading: historyLoading } = useHistoricalData(stationId);

  const handleConsultAI = async () => {
    router.push({
      pathname: '/chat',
      params: {
        stationData: JSON.stringify(historicalData.slice(-5)),
        currentData: JSON.stringify(currentStationData)
      }
    });
  };

  // Get risk level info
  const getRiskLevel = (prediction: number) => {
    // Ensure prediction is within valid range
    const riskLevel = Math.max(0, Math.min(4, Math.floor(prediction)));
    return RISK_LEVELS[riskLevel as keyof typeof RISK_LEVELS] || RISK_LEVELS[0];
  };

  const riskInfo = getRiskLevel(currentStationData.prediction);

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
            {t('dashboard.updated')}: {new Date(currentStationData.timestamp).toLocaleString()}
          </ThemedText>
          <View style={styles.predictionContainer}>
            <ThemedText style={styles.predictionLabel}>
              {t('dashboard.prediction_score')}:
            </ThemedText>
            <View style={[styles.predictionBadge, { backgroundColor: riskInfo.color }]}>
              <ThemedText style={styles.predictionEmoji}>
                {riskInfo.emoji}
              </ThemedText>
              <ThemedText style={styles.predictionText}>
                {riskInfo.text}
              </ThemedText>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.aiButton}
          onPress={handleConsultAI}
        >
          <Ionicons name="sparkles" size={16} color="white" />
          <ThemedText style={styles.aiButtonText}>{t('dashboard.consult_ai')}</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Chart with historical data */}
      <GraphCard 
        historicalData={historicalData} 
        loading={historyLoading}
        stationId={stationId}
      />

      {/* Insight cards with improved grid layout */}
      <View style={styles.insightsContainer}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          {t('dashboard.sensor_insights')}
        </ThemedText>
        
        <View style={styles.grid}>
          <View style={styles.cardWrapper}>
            <InsightCard
              title={t('sensor.temperature')}
              value={`${temperatureInsight.value}°C`}
              message={t(`sensor.message.temperature.${temperatureInsight.status}`)}
              icon="thermometer-outline"
              type={temperatureInsight.status}
            />
          </View>
          
          <View style={styles.cardWrapper}>
            <InsightCard
              title={t('sensor.humidity')}
              value={`${humidityInsight.value}%`}
              message={t(`sensor.message.humidity.${humidityInsight.status}`)}
              icon="rainy-outline"
              type={humidityInsight.status}
            />
          </View>
          
          <View style={styles.cardWrapper}>
            <InsightCard
              title={t('sensor.ph_level')}
              value={`${phInsight.value}`}
              message={t(`sensor.message.ph.${phInsight.status}`)}
              icon="water-outline"
              type={phInsight.status}
            />
          </View>
          
          <View style={styles.cardWrapper}>
            <InsightCard
              title={t('sensor.soil_moisture')}
              value={`${moistureInsight.value}`}
              message={t(`sensor.message.moisture.${moistureInsight.status}`)}
              icon="earth-outline"
              type={moistureInsight.status}
            />
          </View>
          
          <View style={styles.cardWrapper}>
            <InsightCard
              title={t('sensor.air_quality')}
              value={`${gasInsight.value} ppm`}
              message={t(`sensor.message.gas.${gasInsight.status}`)}
              icon="leaf-outline"
              type={gasInsight.status}
            />
          </View>

          <View style={styles.cardWrapper}>
            <InsightCard
              title={t('sensor.light_intensity')}
              value={`${lightInsight.value} lux`}
              message={t(`sensor.message.light.${lightInsight.status}`)}
              icon="sunny-outline"
              type={lightInsight.status}
            />
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop:10,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  stationInfo: {
    flex: 1,
  },
  stationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#1F2937',
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
    color: '#6B7280',
  },
  predictionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  predictionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginRight: 8,
  },
  predictionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  predictionEmoji: {
    fontSize: 12,
    marginRight: 4,
  },
  predictionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
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
  insightsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1F2937',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -6,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 12,
    paddingHorizontal: 6,
  },
});