import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'ne';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Nepali translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.chat': 'Chat',
    'nav.settings': 'Settings',
    
    // Home Screen
    'home.title': 'AgriTech',
    'home.welcome': 'Welcome to AgriTech!',
    'home.subtitle': 'Monitor your farm stations in real-time and get meaningful insights.',
    'home.dashboard_info': 'Go to the Dashboard tab for full analytics and reports.',
    
    // Dashboard
    'dashboard.farm_overview': 'Farm Overview',
    'dashboard.active_stations': 'Active Stations',
    'dashboard.good_conditions': 'Good Conditions',
    'dashboard.latest_update': 'Latest Update',
    'dashboard.view_full': 'View Full Dashboard',
    'dashboard.loading': 'Loading stations...',
    'dashboard.no_data': 'No station data available',
    'dashboard.consult_ai': 'Consult AI',
    'dashboard.updated': 'Updated',
    'dashboard.prediction_score': 'Fire Prediction Score',
    
    // Sensor Labels
    'sensor.temperature': 'Temperature',
    'sensor.humidity': 'Humidity',
    'sensor.ph_level': 'pH Level',
    'sensor.soil_moisture': 'Soil Moisture',
    'sensor.air_quality': 'Air Quality',
    'sensor.light_intensity': 'Light Intensity',
    
    // Chat
    'chat.title': 'Farm AI Assistant',
    'chat.new_chat': 'New Chat',
    'chat.placeholder': 'Ask me about your farm data...',
    'chat.empty_title': 'Start a conversation with our AI assistant',
    'chat.empty_subtitle': 'Ask about your farm data, get insights, or seek farming advice',
    'chat.loading_insights': 'Getting fresh insights from your farm data...',
    'chat.loading_subtitle': 'Please wait while AI analyzes your latest readings',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.english': 'English',
    'settings.nepali': 'नेपाली',
    'settings.device_info': 'Connect to your device and handle important settings here.',
    
    // Status
    'status.good': 'Good',
    'status.warning': 'Warning',
    'status.critical': 'Critical',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.save': 'Save',
        'sensor.message.temperature.good': 'Ideal temperature for growth',
    'sensor.message.temperature.moderate': 'Acceptable temperature range',
    'sensor.message.temperature.warning': 'Temperature needs monitoring',
    'sensor.message.temperature.danger': 'Critical temperature level',
    
    'sensor.message.humidity.good': 'Optimal humidity level',
    'sensor.message.humidity.moderate': 'Acceptable humidity range',
    'sensor.message.humidity.warning': 'Humidity needs attention',
    'sensor.message.humidity.danger': 'Critical humidity level',
    
    'sensor.message.ph.good': 'Optimal pH for most crops',
    'sensor.message.ph.moderate': 'Acceptable pH range',
    'sensor.message.ph.warning': 'pH needs adjustment',
    'sensor.message.ph.danger': 'Critical pH level',
    
    'sensor.message.moisture.good': 'Optimal soil moisture',
    'sensor.message.moisture.moderate': 'Adequate soil moisture',
    'sensor.message.moisture.warning': 'Moisture needs monitoring',
    'sensor.message.moisture.danger': 'Critical moisture level',
    
    'sensor.message.gas.good': 'Excellent air quality',
    'sensor.message.gas.moderate': 'Good air quality',
    'sensor.message.gas.warning': 'Moderate air quality',
    'sensor.message.gas.danger': 'Poor air quality',
    
    'sensor.message.light.good': 'Optimal light intensity',
    'sensor.message.light.moderate': 'Adequate light level',
    'sensor.message.light.warning': 'Light needs adjustment',
    'sensor.message.light.danger': 'Critical light level',

        // Chart translations
    'chart.title': 'Historical Trends',
    'chart.select_parameter': 'Select Parameter',
    'chart.loading': 'Loading historical data...',
    'chart.no_data': 'No historical data available',
    'chart.showing_points': 'Showing last {{count}} data points',
    
    // Chart parameter labels
    'chart.parameter.temperature': 'Temperature (°C)',
    'chart.parameter.humidity': 'Humidity (%)',
    'chart.parameter.ph': 'pH Level',
    'chart.parameter.moisture': 'Soil Moisture',
    'chart.parameter.gas_level': 'Air Quality (ppm)',
    'chart.parameter.light_intensity': 'Light Intensity (lux)',
    
    // Chart legend labels
    'chart.legend.temperature': 'TEMPERATURE',
    'chart.legend.humidity': 'HUMIDITY',
    'chart.legend.ph': 'PH LEVEL',
    'chart.legend.moisture': 'SOIL MOISTURE',
    'chart.legend.gas_level': 'AIR QUALITY',
    'chart.legend.light_intensity': 'LIGHT INTENSITY',

      // AI Insights Modal
    'ai_insights.title': 'AI Insights',
    'ai_insights.station': 'Station',
    'ai_insights.analyzing': 'AI is analyzing your data...',
    'ai_insights.confidence_score': 'Confidence Score',
    'ai_insights.summary': 'Summary',
    'ai_insights.recommendations': 'Recommendations',
    'ai_insights.priority_actions': 'Priority Actions',
    'ai_insights.risk_assessment': 'Risk Assessment',
    'ai_insights.optimal_conditions': 'Optimal Conditions',
    'ai_insights.generated': 'Generated',

    'chat.ai_thinking': 'AI is thinking...',



  },
  ne: {
    // Navigation
    'nav.home': 'घर',
    'nav.dashboard': 'ड्यासबोर्ड',
    'nav.chat': 'कुराकानी',
    'nav.settings': 'सेटिङ्ग्स',
    
    // Home Screen
    'home.title': 'कृषि प्रविधि',
    'home.welcome': 'कृषि प्रविधिमा स्वागत छ!',
    'home.subtitle': 'वास्तविक समयमा आफ्ना खेती स्टेशनहरूको निगरानी गर्नुहोस् र अर्थपूर्ण जानकारी प्राप्त गर्नुहोस्।',
    'home.dashboard_info': 'पूर्ण विश्लेषण र रिपोर्टहरूको लागि ड्यासबोर्ड ट्याबमा जानुहोस्।',
    
    // Dashboard
    'dashboard.farm_overview': 'खेती सिंहावलोकन',
    'dashboard.active_stations': 'सक्रिय स्टेशनहरू',
    'dashboard.good_conditions': 'राम्रो अवस्था',
    'dashboard.latest_update': 'पछिल्लो अपडेट',
    'dashboard.view_full': 'पूर्ण ड्यासबोर्ड हेर्नुहोस्',
    'dashboard.loading': 'स्टेशनहरू लोड गर्दै...',
    'dashboard.no_data': 'कुनै स्टेशन डाटा उपलब्ध छैन',
    'dashboard.consult_ai': 'AI सल्लाह लिनुहोस्',
    'dashboard.updated': 'अपडेट गरिएको',
    'dashboard.prediction_score': 'आगलागी भविष्यवाणी स्कोर',
    
    // Sensor Labels
    'sensor.temperature': 'तापक्रम',
    'sensor.humidity': 'आर्द्रता',
    'sensor.ph_level': 'pH स्तर',
    'sensor.soil_moisture': 'माटोको चिस्यान',
    'sensor.air_quality': 'हावाको गुणस्तर',
    'sensor.light_intensity': 'प्रकाशको तीव्रता',
    
    // Chat
    'chat.title': 'खेती AI सहायक',
    'chat.new_chat': 'नयाँ कुराकानी',
    'chat.placeholder': 'मलाई आफ्नो खेतीको डाटाको बारेमा सोध्नुहोस्...',
    'chat.empty_title': 'हाम्रो AI सहायकसँग कुराकानी सुरु गर्नुहोस्',
    'chat.empty_subtitle': 'आफ्नो खेतीको डाटाको बारेमा सोध्नुहोस्, जानकारी पाउनुहोस्, वा खेतीको सल्लाह खोज्नुहोस्',
    'chat.loading_insights': 'तपाईंको खेतीको डाटाबाट ताजा जानकारी प्राप्त गर्दै...',
    'chat.loading_subtitle': 'कृपया AI ले तपाईंको भर्खरका रिडिंगहरू विश्लेषण गर्दा प्रतीक्षा गर्नुहोस्',
    
    // Settings
    'settings.title': 'सेटिङ्ग्स',
    'settings.language': 'भाषा',
    'settings.english': 'अंग्रेजी',
    'settings.nepali': 'नेपाली',
    'settings.device_info': 'आफ्नो उपकरणमा जडान गर्नुहोस् र महत्वपूर्ण सेटिङ्गहरू ह्यान्डल गर्नुहोस्।',
    
    // Status
    'status.good': 'राम्रो',
    'status.warning': 'चेतावनी',
    'status.critical': 'गम्भीर',
    
    // Common
    'common.loading': 'लोड गर्दै...',
    'common.error': 'त्रुटि',
    'common.retry': 'पुनः प्रयास',
    'common.close': 'बन्द गर्नुहोस्',
    'common.save': 'सेभ गर्नुहोस्',


    //sensor datas
        'sensor.message.temperature.good': 'बृद्धिको लागि आदर्श तापक्रम',
    'sensor.message.temperature.moderate': 'स्वीकार्य तापक्रम दायरा',
    'sensor.message.temperature.warning': 'तापक्रम निगरानी आवश्यक',
    'sensor.message.temperature.danger': 'गम्भीर तापक्रम स्तर',
    
    'sensor.message.humidity.good': 'इष्टतम आर्द्रता स्तर',
    'sensor.message.humidity.moderate': 'स्वीकार्य आर्द्रता दायरा',
    'sensor.message.humidity.warning': 'आर्द्रतामा ध्यान आवश्यक',
    'sensor.message.humidity.danger': 'गम्भीर आर्द्रता स्तर',
    
    'sensor.message.ph.good': 'धेरैजसो बालीका लागि इष्टतम pH',
    'sensor.message.ph.moderate': 'स्वीकार्य pH दायरा',
    'sensor.message.ph.warning': 'pH समायोजन आवश्यक',
    'sensor.message.ph.danger': 'गम्भीर pH स्तर',
    
    'sensor.message.moisture.good': 'इष्टतम माटोको चिस्यान',
    'sensor.message.moisture.moderate': 'पर्याप्त माटोको चिस्यान',
    'sensor.message.moisture.warning': 'चिस्यान निगरानी आवश्यक',
    'sensor.message.moisture.danger': 'गम्भीर चिस्यान स्तर',
    
    'sensor.message.gas.good': 'उत्कृष्ट हावाको गुणस्तर',
    'sensor.message.gas.moderate': 'राम्रो हावाको गुणस्तर',
    'sensor.message.gas.warning': 'मध्यम हावाको गुणस्तर',
    'sensor.message.gas.danger': 'खराब हावाको गुणस्तर',
    
    'sensor.message.light.good': 'इष्टतम प्रकाशको तीव्रता',
    'sensor.message.light.moderate': 'पर्याप्त प्रकाश स्तर',
    'sensor.message.light.warning': 'प्रकाश समायोजन आवश्यक',
    'sensor.message.light.danger': 'गम्भीर प्रकाश स्तर',

        // Chart translations in Nepali
    'chart.title': 'ऐतिहासिक प्रवृत्ति',
    'chart.select_parameter': 'प्यारामिटर चयन गर्नुहोस्',
    'chart.loading': 'ऐतिहासिक डाटा लोड गर्दै...',
    'chart.no_data': 'कुनै ऐतिहासिक डाटा उपलब्ध छैन',
    'chart.showing_points': 'पछिल्लो {{count}} डाटा पोइन्टहरू देखाउँदै',
    
    // Chart parameter labels in Nepali
    'chart.parameter.temperature': 'तापक्रम (°C)',
    'chart.parameter.humidity': 'आर्द्रता (%)',
    'chart.parameter.ph': 'pH स्तर',
    'chart.parameter.moisture': 'माटोको चिस्यान',
    'chart.parameter.gas_level': 'हावाको गुणस्तर (ppm)',
    'chart.parameter.light_intensity': 'प्रकाशको तीव्रता (lux)',
    
    // Chart legend labels in Nepali
    'chart.legend.temperature': 'तापक्रम',
    'chart.legend.humidity': 'आर्द्रता',
    'chart.legend.ph': 'PH स्तर',
    'chart.legend.moisture': 'माटोको चिस्यान',
    'chart.legend.gas_level': 'हावाको गुणस्तर',
    'chart.legend.light_intensity': 'प्रकाशको तीव्रता',

      // AI Insights Modal in Nepali
    'ai_insights.title': 'AI जानकारी',
    'ai_insights.station': 'स्टेशन',
    'ai_insights.analyzing': 'AI ले तपाईंको डाटा विश्लेषण गरिरहेको छ...',
    'ai_insights.confidence_score': 'विश्वास स्कोर',
    'ai_insights.summary': 'सारांश',
    'ai_insights.recommendations': 'सिफारिसहरू',
    'ai_insights.priority_actions': 'प्राथमिकताका कार्यहरू',
    'ai_insights.risk_assessment': 'जोखिम मूल्याङ्कन',
    'ai_insights.optimal_conditions': 'इष्टतम अवस्थाहरू',
    'ai_insights.generated': 'उत्पन्न गरिएको',

    'chat.ai_thinking': 'AI सोचिरहेको छ...',


  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load saved language on app start
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('app_language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ne')) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('app_language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string, params?: { [key: string]: string | number }): string => {
    let translation = translations[language][key] || key;
    
    // Handle string interpolation for dynamic values
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, params[param].toString());
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};