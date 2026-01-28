import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useSoundStore } from '../stores/soundStore';
import { Sound } from '../constants/sounds';
import { 
  COLORS, 
  SPACING, 
  TYPOGRAPHY, 
  RADIUS, 
  SHADOWS,
  LAYOUT,
  ANIMATION,
} from '../constants/theme';

// =============================================================================
// TYPES
// =============================================================================

interface SoundCardProps {
  sound: Sound;
  isPlaying: boolean;
  isPremium: boolean;
  isLocked: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function SoundCard({ sound, isPlaying, isPremium, isLocked }: SoundCardProps) {
  const { toggleSound } = useSoundStore();
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  // Start glow animation when playing
  if (isPlaying && glowOpacity.value === 0) {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.15, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  } else if (!isPlaying) {
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
  }

  const handlePress = async () => {
    if (isLocked) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      // TODO: Navigate to premium screen
      return;
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Gentle press animation
    scale.value = withSpring(0.96, ANIMATION.spring.gentle, () => {
      scale.value = withSpring(1, ANIMATION.spring.gentle);
    });
    
    toggleSound(sound.id);
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.card, animatedCardStyle]}>
        <LinearGradient
          colors={isPlaying ? [...sound.activeGradient] : [...sound.gradient]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Soft glow when playing */}
          <Animated.View style={[styles.glow, animatedGlowStyle]} />
          
          {/* Lock overlay for premium */}
          {isLocked && (
            <View style={styles.lockOverlay}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          )}
          
          {/* Sound icon */}
          <Text style={styles.icon}>{sound.icon}</Text>
          
          {/* Sound name */}
          <Text style={styles.name}>{sound.name}</Text>
          
          {/* Premium badge */}
          {isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>PRO</Text>
            </View>
          )}

          {/* Playing indicator */}
          {isPlaying && (
            <View style={styles.playingIndicator}>
              <View style={styles.playingDot} />
            </View>
          )}
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  card: {
    width: LAYOUT.soundCard.width,
    height: LAYOUT.soundCard.height,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.card,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    position: 'relative',
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.text.inverse,
    borderRadius: RADIUS.xl,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.black[20],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  lockIcon: {
    fontSize: LAYOUT.iconSize.xl,
  },
  icon: {
    fontSize: LAYOUT.iconSize.emoji,
    marginBottom: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.text.primary,
    textAlign: 'center',
    opacity: 0.9,
  },
  premiumBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  premiumBadgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.text.inverse,
    letterSpacing: 0.5,
  },
  playingIndicator: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
  },
  playingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
});
