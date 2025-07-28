//just In case the previous consulting method was fine

// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { useChat } from "@/hooks/useChat";
// import { StationData } from "@/services/types";
// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";
// import Markdown from "react-native-markdown-display";

// export default function ChatScreen() {
//   const { messages, loading, error, sendMessage, sendStationDataQuery, clearChat } = useChat();
//   const [inputText, setInputText] = useState('');
//   const params = useLocalSearchParams();

//   // Handle station data from navigation params
//   useEffect(() => {
//     if (params.stationData) {
//       try {
//         const stationData: StationData[] = JSON.parse(params.stationData as string);
//         sendStationDataQuery(stationData);
//       } catch (error) {
//         console.error('Error parsing station data:', error);
//       }
//     }
//   }, [params.stationData]);

//   const handleSend = async () => {
//     if (inputText.trim()) {
//       await sendMessage(inputText.trim());
//       setInputText('');
//     }
//   };

//   const renderMessage = ({ item }: { item: any }) => (
//     <View style={[
//       styles.messageContainer,
//       item.isUser ? styles.userMessage : styles.aiMessage
//     ]}>
//       <View style={styles.messageHeader}>
//         <Ionicons 
//           name={item.isUser ? "person" : "sparkles"} 
//           size={16} 
//           color={item.isUser ? "#007AFF" : "#10B981"} 
//         />
//         <ThemedText style={styles.messageTime}>
//           {item.timestamp.toLocaleTimeString()}
//         </ThemedText>
//       </View>
      
//       {item.isUser ? (
//         <ThemedText style={styles.messageText}>{item.text}</ThemedText>
//       ) : (
//         <View style={styles.markdownContainer}>
//           <Markdown style={markdownStyles}>
//             {item.text}
//           </Markdown>
//         </View>
//       )}
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container} 
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ThemedView style={styles.header}>
//         <View style={styles.headerContent}>
//           <Ionicons name="sparkles" size={24} color="#007AFF" />
//           <ThemedText type="title" style={styles.headerTitle}>
//             Farm AI Assistant
//           </ThemedText>
//         </View>
//         <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
//           <Ionicons name="refresh" size={20} color="#666" />
//         </TouchableOpacity>
//       </ThemedView>

//       {messages.length === 0 && !loading ? (
//         <ThemedView style={styles.emptyState}>
//           <Ionicons name="chatbubbles-outline" size={64} color="#ccc" />
//           <ThemedText style={styles.emptyText}>
//             Start a conversation with our AI assistant
//           </ThemedText>
//           <ThemedText style={styles.emptySubtext}>
//             Ask about your farm data, get insights, or seek farming advice
//           </ThemedText>
//         </ThemedView>
//       ) : (
//         <FlatList
//           data={messages}
//           renderItem={renderMessage}
//           keyExtractor={(item) => item.id}
//           style={styles.messagesList}
//           contentContainerStyle={styles.messagesContainer}
//         />
//       )}

//       {error && (
//         <View style={styles.errorContainer}>
//           <Ionicons name="warning" size={16} color="#F44336" />
//           <ThemedText style={styles.errorText}>{error}</ThemedText>
//         </View>
//       )}

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.textInput}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="Ask me about your farm data..."
//           multiline
//           maxLength={500}
//         />
//         <TouchableOpacity 
//           onPress={handleSend} 
//           style={[styles.sendButton, { opacity: inputText.trim() ? 1 : 0.5 }]}
//           disabled={!inputText.trim() || loading}
//         >
//           {loading ? (
//             <ActivityIndicator size="small" color="white" />
//           ) : (
//             <Ionicons name="send" size={20} color="white" />
//           )}
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     paddingTop: 50,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     backgroundColor: 'white',
//   },
//   headerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     marginLeft: 8,
//     fontSize: 20,
//   },
//   clearButton: {
//     padding: 8,
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 32,
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 16,
//     textAlign: 'center',
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   messagesList: {
//     flex: 1,
//   },
//   messagesContainer: {
//     padding: 16,
//   },
//   messageContainer: {
//     marginBottom: 16,
//     padding: 12,
//     borderRadius: 12,
//     maxWidth: '90%', // Increased from 85% to 90%
//   },
//   userMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#007AFF',
//   },
//   aiMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   messageHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   messageTime: {
//     fontSize: 12,
//     color: '#666',
//     marginLeft: 6,
//   },
//   messageText: {
//     fontSize: 14,
//     color: 'white',
//   },
//   markdownContainer: {
//     // Removed maxHeight and ScrollView - let it expand naturally
//     // The FlatList will handle the scrolling
//   },
//   errorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     margin: 16,
//     backgroundColor: '#ffebee',
//     borderRadius: 8,
//   },
//   errorText: {
//     color: '#F44336',
//     marginLeft: 8,
//     fontSize: 14,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     padding: 16,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   textInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     fontSize: 16,
//     maxHeight: 100,
//     marginRight: 8,
//   },
//   sendButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 20,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 40,
//     height: 40,
//   },
// });

// const markdownStyles = StyleSheet.create({
//   body: {
//     fontSize: 14,
//     color: '#333',
//   },
//   heading1: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   heading2: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 6,
//   },
//   paragraph: {
//     marginVertical: 4,
//     lineHeight: 20,
//   },
//   list_item: {
//     marginVertical: 2,
//   },
//   code_inline: {
//     backgroundColor: '#f5f5f5',
//     padding: 2,
//     borderRadius: 4,
//   },
// });

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChat } from "@/hooks/useChat";
import { StationData } from "@/services/types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Markdown from "react-native-markdown-display";

export default function ChatScreen() {
  const { messages, loading, error, sendMessage, sendStationDataQuery, clearChat } = useChat();
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [initialStationData, setInitialStationData] = useState<StationData[] | null>(null);
  const params = useLocalSearchParams();

  // Parse and store station data on mount
  useEffect(() => {
    if (params.stationData) {
      try {
        const stationData: StationData[] = JSON.parse(params.stationData as string);
        setInitialStationData(stationData);
        sendStationDataQuery(stationData);
      } catch (error) {
        console.error('Error parsing station data:', error);
      }
    }
  }, [params.stationData]);

  const handleSend = async () => {
    if (inputText.trim()) {
      await sendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleClearAndConsult = () => {
    clearChat();
    if (initialStationData) {
      setTimeout(() => {
        sendStationDataQuery(initialStationData);
      }, 100);
    }
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.aiMessage
    ]}>
      <View style={styles.messageHeader}>
        <Ionicons 
          name={item.isUser ? "person" : "sparkles"} 
          size={16} 
          color={item.isUser ? "#007AFF" : "#10B981"} 
        />
        <ThemedText style={styles.messageTime}>
          {item.timestamp.toLocaleTimeString()}
        </ThemedText>
      </View>
      
      {item.isUser ? (
        <ThemedText style={styles.messageText}>{item.text}</ThemedText>
      ) : (
        <View style={styles.markdownContainer}>
          <Markdown style={markdownStyles}>
            {item.text}
          </Markdown>
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ThemedView style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="sparkles" size={24} color="#007AFF" />
          <ThemedText type="title" style={styles.headerTitle}>
            {t('chat.title')}
          </ThemedText>
        </View>
        <TouchableOpacity onPress={handleClearAndConsult} style={styles.clearButton}>
          <Ionicons name="refresh" size={20} color="#666" />
          <ThemedText style={styles.refreshText}>{t('chat.new_chat')}</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {messages.length === 0 && !loading ? (
        <ThemedView style={styles.emptyState}>
          <Ionicons name="chatbubbles-outline" size={64} color="#ccc" />
          <ThemedText style={styles.emptyText}>
            {initialStationData ? t('chat.loading_insights') : t('chat.empty_title')}
          </ThemedText>
          <ThemedText style={styles.emptySubtext}>
            {initialStationData ? t('chat.loading_subtitle') : t('chat.empty_subtitle')}
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContainer}
        />
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={16} color="#F44336" />
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder={t('chat.placeholder')}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          onPress={handleSend} 
          style={[styles.sendButton, { opacity: inputText.trim() ? 1 : 0.5 }]}
          disabled={!inputText.trim() || loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Ionicons name="send" size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 8,
    fontSize: 20,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  refreshText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    maxWidth: '90%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  messageText: {
    fontSize: 14,
    color: 'white',
  },
  markdownContainer: {
    // Let it expand naturally
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
  },
  errorText: {
    color: '#F44336',
    marginLeft: 8,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    fontSize: 14,
    color: '#333',
  },
  heading1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  heading2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  paragraph: {
    marginVertical: 4,
    lineHeight: 20,
  },
  list_item: {
    marginVertical: 2,
  },
  code_inline: {
    backgroundColor: '#f5f5f5',
    padding: 2,
    borderRadius: 4,
  },
});