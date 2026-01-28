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
    buttonScale.value = withSpring(0.95, ANIMATION.spring.gentle, () => {
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
        <Animated.View style={[styles.button, isActive && styles.buttonActive, buttonStyle]}>
          <Text style={styles.icon}>⏰</Text>
          {timerRemaining !== null && (
            <Text style={styles.timerText}>{formatTimeRemaining(timerRemaining)}</Text>
          )}
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
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Sleep Timer</Text>
            <Text style={styles.modalSubtitle}>
              Sounds will gently fade out after the selected time
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white[50],
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.round,
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.neutral[200],
  },
  buttonActive: {
    backgroundColor: COLORS.primary.light,
    borderColor: COLORS.primary.main,
  },
  icon: {
    fontSize: 16,
  },
  timerText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.black[50],
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  modalContent: {
    backgroundColor: COLORS.background.card,
    borderRadius: RADIUS.xxl,
    padding: SPACING.xxl,
    width: '100%',
    maxWidth: 340,
    ...SHADOWS.lg,
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
    backgroundColor: COLORS.neutral[100],
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
    minWidth: 90,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: COLORS.primary.main,
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
