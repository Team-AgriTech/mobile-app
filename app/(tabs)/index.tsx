import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DashboardSummary } from '@/components/dashboard/DashboardSummary';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.appTitle}>AgriTech</ThemedText>
        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <ThemedText type="title" style={styles.welcomeTitle}>
            Welcome to AgriTech!
          </ThemedText>
          <ThemedText type="default" style={styles.welcomeSubtitle}>
            Monitor your farm stations in real-time and get meaningful insights.
          </ThemedText>
        </View>

        {/* Dashboard Summary */}
        <DashboardSummary />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="analytics-outline" size={20} color="#007AFF" style={{ marginRight: 8 }} />
          <ThemedText type="default" style={styles.infoText}>
            Go to the Dashboard tab for full analytics and reports.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    gap:10,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  appTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  notificationButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E0F2FE',
  },
  content: {
    flex: 1,
  },
  welcomeCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0F172A',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#475569',
  },
  infoCard: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#E0F7FA',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  infoText: {
    fontSize: 15,
    color: '#334155',
    flex: 1,
    flexWrap: 'wrap',
  },
});
