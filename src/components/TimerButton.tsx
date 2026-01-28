import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, { 
  FadeIn, 
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useSoundStore } from '../stores/soundStore';
import { 
  COLORS, 
  SPACING, 
  TYPOGRAPHY, 
  RADIUS, 
  SHADOWS,
  ANIMATION,
  GLASS,
} from '../constants/theme';

// =============================================================================
// CONSTANTS
// =============================================================================

interface TimerOption {
  label: string;
  minutes: number;
}

const TIMER_OPTIONS: readonly TimerOption[] = [
  { label: '15 min', minutes: 15 },
  { label: '30 min', minutes: 30 },
  { label: '45 min', minutes: 45 },
  { label: '1 hour', minutes: 60 },
  { label: '2 hours', minutes: 120 },
  { label: 'Off', minutes: 0 },
] as const;

const SECONDS_PER_MINUTE = 60;

// =============================================================================
// HELPERS
// =============================================================================

const formatTimeRemaining = (seconds: number): string => {
  const mins = Math.floor(seconds / SECONDS_PER_MINUTE);
  const secs = seconds % SECONDS_PER_MINUTE;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// =============================================================================
// COMPONENT
// =============================================================================

export function TimerButton() {
  const [showModal, setShowModal] = useState(false);
  const { timerMinutes, setTimer, timerRemaining } = useSoundStore();
  const buttonScale = useSharedValue(1);

  const handleOpenModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    buttonScale.value = withSpring(0.92, ANIMATION.spring.soft, () => {
      buttonScale.value = withSpring(1, ANIMATION.spring.gentle);
    });
    setShowModal(true);
  };

  const handleSelectTimer = (minutes: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimer(minutes);
    setShowModal(false);
  };

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const isActive = timerMinutes > 0;

  return (
    <>
      <Pressable onPress={handleOpenModal}>
        <Animated.View style={[styles.buttonWrapper, buttonStyle]}>
          <BlurView 
            intensity={GLASS.blur.medium} 
            tint="light" 
            style={[styles.button, isActive && styles.buttonActive]}
          >
            <Text style={styles.icon}>⏰</Text>
            {timerRemaining !== null && (
              <Text style={styles.timerText}>{formatTimeRemaining(timerRemaining)}</Text>
            )}
          </BlurView>
        </Animated.View>
      </Pressable>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowModal(false)}
        >
          <Animated.View 
            entering={FadeIn.duration(ANIMATION.duration.fast)}
            exiting={FadeOut.duration(ANIMATION.duration.fast)}
          >
            <Pressable onPress={e => e.stopPropagation()}>
              <View style={styles.modalCard}>
                <BlurView intensity={GLASS.blur.ultra} tint="light" style={styles.modalBlur}>
                  <Text style={styles.modalTitle}>Sleep Timer</Text>
                  <Text style={styles.modalSubtitle}>
                    Sounds will gently fade after the selected time
                  </Text>
                  
                  <View style={styles.optionsGrid}>
                    {TIMER_OPTIONS.map((option) => {
                      const isSelected = timerMinutes === option.minutes;
                      
                      return (
                        <Pressable
                          key={option.minutes}
                          style={[styles.optionButton, isSelected && styles.optionActive]}
                          onPress={() => handleSelectTimer(option.minutes)}
                        >
                          <Text style={[styles.optionText, isSelected && styles.optionTextActive]}>
                            {option.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </BlurView>
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: RADIUS.round,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  buttonActive: {
    backgroundColor: COLORS.primary.subtle,
  },
  icon: {
    fontSize: 18,
  },
  timerText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.glass.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: RADIUS.xxxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.glass.border,
    ...SHADOWS.lg,
  },
  modalBlur: {
    padding: SPACING.xxl,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.size.xxl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  modalSubtitle: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
    lineHeight: 22,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: COLORS.glass.subtle,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
    minWidth: 95,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.glass.borderSubtle,
  },
  optionActive: {
    backgroundColor: COLORS.primary.main,
    borderColor: COLORS.primary.main,
  },
  optionText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  optionTextActive: {
    color: COLORS.text.inverse,
  },
});
