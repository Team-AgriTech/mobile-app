import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AboutAgritech() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#DEF6D8', dark: '#1C3A23' }}
      headerImage={
        <Image
                  source={require('@/assets/images/partial-react-logo.png')}
                  
                />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          About Agritech.
        </ThemedText>
        <ThemedText type="default" style={styles.paragraph}>
          Agritech is a youth-led initiative driven to revolutionize agriculture through technology. Our mission is to empower farmers with digital tools that simplify, optimize, and enhance the way farming is done in Nepal and beyond.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          🌱 Our Mission
        </ThemedText>
        <ThemedText type="default" style={styles.paragraph}>
          We aim to bridge the gap between traditional farming and modern technological solutions. By leveraging mobile tools, data, and AI, we help farmers improve crop yield, monitor health, and make better decisions.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          🚜 What We Do
        </ThemedText>
        <ThemedText type="default" style={styles.paragraph}>
          - Provide disease detection tools through AI and ML{'\n'}
          - Offer market price updates and weather forecasts{'\n'}
          - Enable smart farm record-keeping and advisory systems
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          🤝 Impact So Far
        </ThemedText>
        <ThemedText type="default" style={styles.paragraph}>
          We've reached over 500+ farmers across rural regions, conducted workshops, and collaborated with local agricultural communities to test and validate our tools on the ground.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          🌐 Our Vision
        </ThemedText>
        <ThemedText type="default" style={styles.paragraph}>
          A future where no farmer is left behind — where access to smart, sustainable farming is a basic right, not a privilege.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 200,
    width: 300,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  container: {
    gap: 16,
  },
  title: {
    marginBottom: 4,
  },
  sectionTitle: {
    marginTop: 8,
  },
  paragraph: {
    lineHeight: 20,
  },
});
