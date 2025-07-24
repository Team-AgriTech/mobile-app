import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface StatusIndicatorProps {
  status: string;
  type: 'good' | 'moderate' | 'warning' | 'danger';
}

export function StatusIndicator({ status, type }: StatusIndicatorProps) {
  const getStatusColor = () => {
    switch (type) {
      case 'good': return '#4CAF50';
      case 'moderate': return '#FF9800';
      case 'warning': return '#FFC107';
      case 'danger': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <View style={[styles.indicator, { borderLeftColor: getStatusColor() }]}>
      <View style={[styles.dot, { backgroundColor: getStatusColor() }]} />
      <ThemedText style={styles.statusText}>{status}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderLeftWidth: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    marginVertical: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    flex: 1,
  },
});