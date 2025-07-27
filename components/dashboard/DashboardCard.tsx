import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StationOverview } from '@/components/dashboard/StationOverview';
import { useCurrentStationData } from '@/hooks/useCurrentStationData';
import React from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  const { currentData, uniqueStations, loading, error, lastUpdated, refresh } = useCurrentStationData();

  if (loading && !currentData) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <ThemedText>Loading station data...</ThemedText>
      </ThemedView>
    );
  }

  if (error && !currentData) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText type="title">Error</ThemedText>
        <ThemedText>{error}</ThemedText>
      </ThemedView>
    );
  }

  if (!currentData) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText type="title">No Data</ThemedText>
        <ThemedText>No current station data available</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Farm Dashboard</ThemedText>
        {lastUpdated && (
          <ThemedText style={styles.lastUpdated}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </ThemedText>
        )}
      </ThemedView>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Show one StationOverview per unique station */}
        {uniqueStations.map((stationId) => (
          <StationOverview 
            key={stationId} 
            currentStationData={currentData}
            stationId={stationId}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  lastUpdated: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
});