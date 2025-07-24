import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DashboardSummary } from '@/components/dashboard/DashboardSummary';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.appTitle}>AgriTech</ThemedText>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome to AgriTech App!</ThemedText>
          <ThemedText type='default'>Monitor your farm stations in real-time</ThemedText>
        </ThemedView>
        
        {/* Dashboard Summary Card */}
        <DashboardSummary />
        
        <ThemedView style={styles.stepContainer}>
          <ThemedText type='default'>Check the Dashboard tab for detailed insights...</ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
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
    paddingVertical: 12,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  stepContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
});
