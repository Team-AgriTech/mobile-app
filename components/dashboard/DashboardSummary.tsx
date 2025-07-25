import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStationData } from '@/hooks/useStationData';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

export function DashboardSummary() {
  const { data, loading, error } = useStationData();

  if (loading) {
    return (
      <ThemedView style={styles.card}>
        <ActivityIndicator size="small" color="#007AFF" />
        <ThemedText style={styles.loadingText}>Loading stations...</ThemedText>
      </ThemedView>
    );
  }

  if (error || data.length === 0) {
    return (
      <ThemedView style={styles.card}>
        <Ionicons name="alert-circle-outline" size={20} color="red" />
        <ThemedText style={styles.errorText}>No station data available</ThemedText>
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
      {/* Header */}
      <View style={styles.cardHeader}>
        <Ionicons name="analytics-outline" size={24} color="#007AFF" />
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          Farm Overview
        </ThemedText>
      </View>

      {/* Stats */}
      <TouchableOpacity style={styles.statsContainer} onPress={handleViewDetails} activeOpacity={0.8}>
        <View style={styles.statBox}>
          <Ionicons name="hardware-chip-outline" size={20} color="#007AFF" />
          <ThemedText type="title" style={styles.statNumber}>{activeStations}</ThemedText>
          <ThemedText style={styles.statLabel}>Active Stations</ThemedText>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="leaf-outline" size={20} color="#28C76F" />
          <ThemedText type="title" style={styles.statNumber}>{goodConditions}</ThemedText>
          <ThemedText style={styles.statLabel}>Good Conditions</ThemedText>
        </View>
      </TouchableOpacity>

      {/* Latest Station Info */}
      <TouchableOpacity style={styles.recentStation} onPress={handleViewDetails} activeOpacity={0.7}>
        <View style={styles.stationInfo}>
          <ThemedText type="defaultSemiBold" style={styles.latestLabel}>Latest Update</ThemedText>
          <ThemedText style={styles.stationName}>{data[0].station_id}</ThemedText>
          <ThemedText style={styles.timestamp}>
            {new Date(data[0].timestamp).toLocaleTimeString()}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#007AFF" />
      </TouchableOpacity>

      {/* CTA Button */}
      <TouchableOpacity style={styles.viewAllButton} onPress={handleViewDetails}>
        <ThemedText style={styles.viewAllText}>View Full Dashboard</ThemedText>
        <Ionicons name="arrow-forward" size={16} color="white" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: '#fff',
    elevation: 3,
    flex:1,
    gap:5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 18,
    color: '#1E293B',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#F0F9FF',
    padding: 12,
    borderRadius: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 22,
    color: '#007AFF',
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  recentStation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  stationInfo: {
    flex: 1,
  },
  latestLabel: {
    fontSize: 14,
    color: '#0F172A',
  },
  stationName: {
    fontWeight: '600',
    marginTop: 4,
    color: '#334155',
  },
  timestamp: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
  },
  viewAllText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 8,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748B',
  },
  errorText: {
    marginLeft: 6,
    fontSize: 14,
    color: 'red',
  },
});
