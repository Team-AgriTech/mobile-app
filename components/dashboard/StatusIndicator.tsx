import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface StatusIndicatorProps {
  status: string;
  type: 'good' | 'moderate' | 'warning' | 'danger';
}

export function StatusIndicator({ status, type }: StatusIndicatorProps) {
  const colorMap = {
    good: {
      text: '#065F46',      // dark green
      background: '#D1FAE5', // green-100
    },
    moderate: {
      text: '#92400E',       // dark amber
      background: '#FEF3C7', // amber-100
    },
    warning: {
      text: '#9A3412',       // dark orange
      background: '#FFEDD5', // orange-100
    },
    danger: {
      text: '#7F1D1D',       // dark red
      background: '#FECACA', // red-100
    },
    default: {
      text: '#374151',       // gray-700
      background: '#E5E7EB', // gray-200
    },
  };

  const { text, background } = colorMap[type] || colorMap.default;

  return (
    <View style={[styles.badge, { backgroundColor: background }]}>
      <ThemedText style={[styles.statusText, { color: text }]}>{status}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
