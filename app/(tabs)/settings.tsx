import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SettingsScreen() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = async (lang: 'en' | 'ne') => {
    await setLanguage(lang);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
      <IconSymbol
        size={310}
        color="#808080"
        name="gearshape" // Changed from "chevron.left.forwardslash.chevron.right" to "gearshape"
      />
      }>
      <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">{t('settings.title')}</ThemedText>
      </ThemedView>
      
      <ThemedText style={styles.description}>
      {t('settings.device_info')}
      </ThemedText>

      {/* Language Selection */}
      <ThemedView style={styles.section}>
      <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
        {t('settings.language')}
      </ThemedText>
      
      <View style={styles.languageOptions}>
        <TouchableOpacity 
        style={[styles.languageOption, language === 'en' && styles.activeOption]}
        onPress={() => handleLanguageChange('en')}
        >
        <Ionicons 
          name="checkmark-circle" 
          size={20} 
          color={language === 'en' ? '#007AFF' : '#ccc'} 
        />
        <ThemedText style={[styles.languageText, language === 'en' && styles.activeText]}>
          {t('settings.english')}
        </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.languageOption, language === 'ne' && styles.activeOption]}
        onPress={() => handleLanguageChange('ne')}
        >
        <Ionicons 
          name="checkmark-circle" 
          size={20} 
          color={language === 'ne' ? '#007AFF' : '#ccc'} 
        />
        <ThemedText style={[styles.languageText, language === 'ne' && styles.activeText]}>
          {t('settings.nepali')}
        </ThemedText>
        </TouchableOpacity>
      </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop:10,
    paddingBottom:7,
    marginBottom: 16,
    marginTop:10
  },
  description: {
    marginBottom: 32,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  languageOptions: {
    gap: 12,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  activeOption: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  languageText: {
    marginLeft: 12,
    fontSize: 16,
  },
  activeText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});