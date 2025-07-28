import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DashboardSummary } from '@/components/dashboard/DashboardSummary';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomeScreen() {
  const { t } = useLanguage();

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.appTitle}>
          {t('home.title')}
        </ThemedText>
        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <ThemedText type="title" style={styles.welcomeTitle}>
            {t('home.welcome')}
          </ThemedText>
          <ThemedText type="default" style={styles.welcomeSubtitle}>
            {t('home.subtitle')}
          </ThemedText>
        </View>

        {/* Dashboard Summary */}
        <DashboardSummary />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="analytics-outline" size={20} color="#007AFF" style={{ marginRight: 8 }} />
          <ThemedText type="default" style={styles.infoText}>
            {t('home.dashboard_info')}
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

// ... existing styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingVertical: 10,
    gap: 10,
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
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTitle: {
    fontSize: 24,
    marginBottom: 8,
    color: '#1E293B',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 22,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoText: {
    flex: 1,
    color: '#1E40AF',
    lineHeight: 20,
  },
});