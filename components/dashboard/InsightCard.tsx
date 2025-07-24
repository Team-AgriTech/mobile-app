import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StatusIndicator } from './StatusIndicator';
import { Ionicons } from '@expo/vector-icons';

interface InsightCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: 'good' | 'moderate' | 'warning' | 'danger';
}

export function InsightCard({ title, value, icon, type }: InsightCardProps) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.header}>
        <Ionicons name={icon} size={24} color="#007AFF" />
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>
      </View>
      <StatusIndicator status={value} type={type} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    marginLeft: 8,
    fontSize: 16,
  },
});