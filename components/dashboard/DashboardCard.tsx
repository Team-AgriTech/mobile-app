import React from 'react';
import { StyleSheet, RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StationOverview } from '@/components/dashboard/StationOverview';
import { useStationData } from '@/hooks/useStationData';

export default function DashboardScreen() {
  const { data, loading, error, lastUpdated, refresh } = useStationData();

  if (loading && data.length === 0) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <ThemedText>Loading station data...</ThemedText>
      </ThemedView>
    );
  }

  if (error && data.length === 0) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText type="title">Error</ThemedText>
        <ThemedText>{error}</ThemedText>
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
        {data.map((station) => (
          <StationOverview key={station.station_id} station={station} />
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