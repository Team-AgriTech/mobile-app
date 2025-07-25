import { GraphCard } from '@/components/dashboard/Chart';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAIInsights } from '@/hooks/useAIInsights';
import { AIInsightResponse, StationData } from '@/services/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AIInsightsModal } from './AIInsightsModal';
import { InsightCard } from './InsightCard';

interface StationOverviewProps {
  station: StationData;
}

export function StationOverview({ station }: StationOverviewProps) {
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiInsights, setAiInsights] = useState<AIInsightResponse | null>(null);
  const { getInsights, loading, error } = useAIInsights();

  const getInsightType = (insight: string): 'good' | 'moderate' | 'warning' | 'danger' => {
    const lowerInsight = insight.toLowerCase();
    if (lowerInsight.includes('excellent') || lowerInsight.includes('ideal') || lowerInsight.includes('optimal')) {
      return 'good';
    }
    if (lowerInsight.includes('moderate') || lowerInsight.includes('sufficient')) {
      return 'moderate';
    }
    if (lowerInsight.includes('low') || lowerInsight.includes('high') || lowerInsight.includes('acidic')) {
      return 'warning';
    }
    if (lowerInsight.includes('dry') || lowerInsight.includes('danger')) {
      return 'danger';
    }
    return 'moderate';
  };

  const handleConsultAI = async () => {
    setShowAIModal(true);
    const insights = await getInsights(station);
    if (insights) {
      setAiInsights(insights);
    }
  };

  const handleCloseModal = () => {
    setShowAIModal(false);
    setAiInsights(null);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stationInfo}>
          <ThemedText type="title" style = {styles.stationTitle} >{station.station_id}</ThemedText>
          <ThemedText style={styles.timestamp}>
            Updated: {new Date(station.timestamp).toLocaleString()}
          </ThemedText>
        </View>
        
        <TouchableOpacity 
          style={styles.aiButton}
          onPress={handleConsultAI}
          disabled={loading}
        >
          <Ionicons name="sparkles" size={16} color="white" />
          <ThemedText style={styles.aiButtonText}>Consult AI</ThemedText>
        </TouchableOpacity>
      </View>

      <GraphCard/>

      <View style={styles.grid}>
        <InsightCard
          title="Air Quality"
          value={station.insights.air_quality}
          icon="leaf-outline"
          type={getInsightType(station.insights.air_quality)}
        />
        
        <InsightCard
          title="Moisture"
          value={station.insights.soil_condition}
          icon="earth-outline"
          type={getInsightType(station.insights.soil_condition)}
        />
        
        <InsightCard
          title="pH Status"
          value={station.insights.water_ph_status}
          icon="water-outline"
          type={getInsightType(station.insights.water_ph_status)}
        />
        
        <InsightCard
          title="Temperature"
          value={station.insights.temperature_status}
          icon="thermometer-outline"
          type={getInsightType(station.insights.temperature_status)}
        />
        
        <InsightCard
          title="Humidity"
          value={station.insights.humidity_status}
          icon="rainy-outline"
          type={getInsightType(station.insights.humidity_status)}
        />
      </View>

      <AIInsightsModal
        visible={showAIModal}
        onClose={handleCloseModal}
        insights={aiInsights}
        loading={loading}
        error={error}
        stationId={station.station_id}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  grid: {
    // flex: 1,
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
    textTransform:'capitalize'
  },
});