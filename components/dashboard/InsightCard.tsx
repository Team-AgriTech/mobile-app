import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLanguage } from '@/contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusIndicator } from './StatusIndicator';

interface InsightCardProps {
  title: string;
  value: string;
  message: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: 'good' | 'moderate' | 'warning' | 'danger';
}

export function InsightCard({ title, value, message, icon, type }: InsightCardProps) {
  const { t } = useLanguage();

  return (
    <ThemedView style={[styles.card]}>
      <View style={styles.header}>
        <Ionicons name={icon} size={20} color={getIconColor(type)} style={styles.icon} />
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>
      </View>
      <ThemedText type="title" style={styles.value}>
        {value}
      </ThemedText>
      <ThemedText style={[styles.message, { color: getMessageColor(type) }]}>
        {message}
      </ThemedText>
      <StatusIndicator status={t(`status.${type}`)} type={type} />
    </ThemedView>
  );
}

const getIconColor = (type: InsightCardProps['type']) => {
  switch (type) {
    case 'good':
      return '#10B981';
    case 'moderate':
      return '#F59E0B';
    case 'warning':
      return '#F97316';
    case 'danger':
      return '#EF4444';
    default:
      return '#6B7280';
  }
};

const getMessageColor = (type: InsightCardProps['type']) => {
  switch (type) {
    case 'good':
      return '#059669';
    case 'moderate':
      return '#D97706';
    case 'warning':
      return '#EA580C';
    case 'danger':
      return '#DC2626';
    default:
      return '#6B7280';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    maxWidth: '48%',
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flexShrink: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1F2937',
  },
  message: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
  },
});
