import React from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { AIInsightResponse } from '@/services/types';

interface AIInsightsModalProps {
  visible: boolean;
  onClose: () => void;
  insights: AIInsightResponse | null;
  loading: boolean;
  error: string | null;
  stationId: string;
}

export function AIInsightsModal({ 
  visible, 
  onClose, 
  insights, 
  loading, 
  error, 
  stationId 
}: AIInsightsModalProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return '#4CAF50';
    if (score >= 0.6) return '#FF9800';
    return '#F44336';
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons name="sparkles" size={24} color="#007AFF" />
            <ThemedText type="title" style={styles.title}>AI Insights</ThemedText>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.stationName}>Station: {stationId}</ThemedText>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <ThemedText style={styles.loadingText}>AI is analyzing your data...</ThemedText>
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="warning" size={24} color="#F44336" />
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            </View>
          )}

          {insights && !loading && (
            <View style={styles.insightsContainer}>
              {/* Confidence Score */}
              <View style={styles.confidenceContainer}>
                <ThemedText type="defaultSemiBold">Confidence Score</ThemedText>
                <View style={styles.confidenceScore}>
                  <ThemedText 
                    style={[styles.scoreText, { color: getConfidenceColor(insights.confidence_score) }]}
                  >
                    {Math.round(insights.confidence_score * 100)}%
                  </ThemedText>
                </View>
              </View>

              {/* Summary */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="document-text-outline" size={20} color="#007AFF" />
                  <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Summary</ThemedText>
                </View>
                <ThemedText style={styles.sectionContent}>{insights.ai_insights.summary}</ThemedText>
              </View>

              {/* Recommendations */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="bulb-outline" size={20} color="#007AFF" />
                  <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Recommendations</ThemedText>
                </View>
                {insights.ai_insights.recommendations.map((rec, index) => (
                  <View key={index} style={styles.listItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.listText}>{rec}</ThemedText>
                  </View>
                ))}
              </View>

              {/* Priority Actions */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="flag-outline" size={20} color="#FF9800" />
                  <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Priority Actions</ThemedText>
                </View>
                {insights.ai_insights.priority_actions.map((action, index) => (
                  <View key={index} style={styles.priorityItem}>
                    <ThemedText style={styles.priorityText}>{action}</ThemedText>
                  </View>
                ))}
              </View>

              {/* Risk Assessment */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="shield-checkmark-outline" size={20} color="#4CAF50" />
                  <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Risk Assessment</ThemedText>
                </View>
                <ThemedText style={styles.sectionContent}>{insights.ai_insights.risk_assessment}</ThemedText>
              </View>

              {/* Optimal Conditions */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
                  <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Optimal Conditions</ThemedText>
                </View>
                <ThemedText style={styles.sectionContent}>{insights.ai_insights.optimal_conditions}</ThemedText>
              </View>

              <ThemedText style={styles.timestamp}>
                Generated: {new Date(insights.timestamp).toLocaleString()}
              </ThemedText>
            </View>
          )}
        </ScrollView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 8,
    fontSize: 20,
  },
  closeButton: {
    padding: 8,
  },
  stationName: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFE6E6',
    borderRadius: 8,
    marginVertical: 16,
  },
  errorText: {
    marginLeft: 8,
    color: '#F44336',
    flex: 1,
  },
  insightsContainer: {
    paddingVertical: 16,
  },
  confidenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 16,
  },
  confidenceScore: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    marginLeft: 8,
    fontSize: 16,
  },
  sectionContent: {
    lineHeight: 22,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    marginRight: 8,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  listText: {
    flex: 1,
    lineHeight: 20,
  },
  priorityItem: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  priorityText: {
    color: '#E65100',
    fontWeight: '500',
  },
  timestamp: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.7,
    marginTop: 16,
    paddingBottom: 20,
  },
});