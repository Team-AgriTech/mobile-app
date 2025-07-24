import React from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStationData } from '@/hooks/useStationData';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export function DashboardSummary() {
  const { data, loading, error } = useStationData();

  if (loading) {
    return (
      <ThemedView style={styles.card}>
        <ActivityIndicator size="small" color="#007AFF" />
        <ThemedText>Loading stations...</ThemedText>
      </ThemedView>
    );
  }

  if (error || data.length === 0) {
    return (
      <ThemedView style={styles.card}>
        <ThemedText>No station data available</ThemedText>
      </ThemedView>
    );
  }

  const activeStations = data.length;
  const goodConditions = data.filter(station => 
    station.insights.air_quality.toLowerCase().includes('good') ||
    station.insights.soil_condition.toLowerCase().includes('sufficient')
  ).length;

  const handleViewDetails = () => {
    router.push('/dashboard');
  };

  return (
    <ThemedView style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="analytics-outline" size={24} color="#007AFF" />
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          Farm Overview
        </ThemedText>
      </View>
      
      <TouchableOpacity style={styles.statsContainer} onPress={handleViewDetails}>
        <View style={styles.stat}>
          <ThemedText type="title" style={styles.statNumber}>{activeStations}</ThemedText>
          <ThemedText style={styles.statLabel}>Active Stations</ThemedText>
        </View>
        
        <View style={styles.stat}>
          <ThemedText type="title" style={styles.statNumber}>{goodConditions}</ThemedText>
          <ThemedText style={styles.statLabel}>Good Conditions</ThemedText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.recentStation} onPress={handleViewDetails}>
        <View style={styles.stationInfo}>
          <ThemedText type="defaultSemiBold">Latest Update:</ThemedText>
          <ThemedText style={styles.stationName}>{data[0].station_id}</ThemedText>
          <ThemedText style={styles.timestamp}>
            {new Date(data[0].timestamp).toLocaleTimeString()}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#007AFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewAllButton} onPress={handleViewDetails}>
        <ThemedText style={styles.viewAllText}>View Full Dashboard</ThemedText>
        <Ionicons name="arrow-forward" size={16} color="#007AFF" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  recentStation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    marginBottom: 12,
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontWeight: '600',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  viewAllText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
  },
});