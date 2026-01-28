import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useSoundStore } from '../stores/soundStore';
import { COLORS, ANIMATION } from '../constants/theme';

// =============================================================================
// COMPONENT
// =============================================================================

export default function RootLayout() {
  const initializeAudio = useSoundStore((state) => state.initialize);

  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: styles.content,
          animation: 'fade',
          animationDuration: ANIMATION.duration.normal,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen 
          name="premium" 
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
            animationDuration: ANIMATION.duration.slow,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.gradientStart,
  },
  content: {
    backgroundColor: COLORS.background.gradientStart,
  },
});
