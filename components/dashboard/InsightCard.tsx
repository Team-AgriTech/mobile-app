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
    <ThemedView style={[styles.card, getCardStyle(type)]}>
      <View style={styles.header}>
        <Ionicons name={icon} size={22} color={getIconColor(type)} style={styles.icon} />
        <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={2}>
          {title}
        </ThemedText>
      </View>
      
      <ThemedText type="title" style={styles.value}>
        {value}
      </ThemedText>
      
      <ThemedText style={[styles.message, { color: getMessageColor(type) }]} numberOfLines={2}>
        {message}
      </ThemedText>
      
      <View style={styles.statusContainer}>
        <StatusIndicator status={t(`status.${type}`)} type={type} />
      </View>
    </ThemedView>
  );
}

const getCardStyle = (type: InsightCardProps['type']) => {
  switch (type) {
    case 'good':
      return { borderLeftColor: '#10B981', borderLeftWidth: 4 };
    case 'moderate':
      return { borderLeftColor: '#F59E0B', borderLeftWidth: 4 };
    case 'warning':
      return { borderLeftColor: '#F97316', borderLeftWidth: 4 };
    case 'danger':
      return { borderLeftColor: '#EF4444', borderLeftWidth: 4 };
    default:
      return { borderLeftColor: '#6B7280', borderLeftWidth: 4 };
  }
};

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
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    minHeight: 140, // Ensures consistent height
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    marginTop: 2, // Slight adjustment for better alignment
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1, // Takes remaining space
    lineHeight: 18,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1F2937',
  },
  message: {
    fontSize: 12,
    lineHeight: 16,
    flex: 1, // Takes remaining space
    marginBottom: 8,
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
});
