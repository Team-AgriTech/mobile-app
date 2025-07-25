import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ChatScreen() {
  return (
    <ThemedView style={{ flex: 1, gap:2, alignItems: 'flex-start', padding: 20, alignContent: 'flex-start' }}>
      <ThemedText type="title" style={{fontSize:25}}>Chat with our awesome AI.</ThemedText>
      <ThemedText type="default">
        Stay tuned for updates on our chat feature. We are working hard to bring you a seamless communication experience.
      </ThemedText>
    </ThemedView>
  );
}