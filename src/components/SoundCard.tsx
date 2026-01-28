import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  interpolateColor,
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
  GLASS,
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
// ANIMATED BLUR VIEW
// =============================================================================

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

// =============================================================================
// COMPONENT
// =============================================================================

export function SoundCard({ sound, isPlaying, isPremium, isLocked }: SoundCardProps) {
  const { toggleSound } = useSoundStore();
  const scale = useSharedValue(1);
  const glowIntensity = useSharedValue(0);

  // Pulsing glow when playing
  if (isPlaying && glowIntensity.value === 0) {
    glowIntensity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  } else if (!isPlaying && glowIntensity.value !== 0) {
    glowIntensity.value = withTiming(0, { duration: ANIMATION.duration.normal });
  }

  const handlePress = async () => {
    if (isLocked) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    scale.value = withSpring(0.95, ANIMATION.spring.soft, () => {
      scale.value = withSpring(1, ANIMATION.spring.gentle);
    });
    
    toggleSound(sound.id);
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedTintStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      glowIntensity.value,
      [0, 1],
      [sound.tint.base, sound.tint.active]
    );
    return { backgroundColor };
  });

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowIntensity.value * 0.6,
  }));

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.cardWrapper, animatedCardStyle]}>
        {/* Glow effect behind card when playing */}
        <Animated.View 
          style={[
            styles.glowEffect, 
            { backgroundColor: sound.tint.active },
            animatedGlowStyle,
          ]} 
        />
        
        {/* Glass card */}
        <View style={styles.card}>
          <BlurView 
            intensity={isPlaying ? GLASS.blur.medium : GLASS.blur.light} 
            tint="light" 
            style={styles.blur}
          >
            {/* Color tint overlay */}
            <Animated.View style={[styles.tintOverlay, animatedTintStyle]} />
            
            {/* Content */}
            <View style={styles.content}>
              {/* Lock overlay */}
              {isLocked && (
                <View style={styles.lockOverlay}>
                  <BlurView intensity={30} tint="light" style={styles.lockBlur}>
                    <Text style={styles.lockIcon}>🔒</Text>
                  </BlurView>
                </View>
              )}
              
              {/* Playing indicator */}
              {isPlaying && (
                <View style={styles.playingIndicator}>
                  <View style={styles.playingDot} />
                </View>
              )}
              
              {/* Emoji icon */}
              <Text style={styles.icon}>{sound.icon}</Text>
              
              {/* Sound name */}
              <Text style={styles.name}>{sound.name}</Text>
              
              {/* Premium badge */}
              {isPremium && !isLocked && (
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>PRO</Text>
                </View>
              )}
            </View>
          </BlurView>
        </View>
      </Animated.View>
    </Pressable>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  cardWrapper: {
    width: LAYOUT.soundCard.width,
    height: LAYOUT.soundCard.height,
  },
  glowEffect: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    borderRadius: RADIUS.xxl,
    ...SHADOWS.glow,
  },
  card: {
    flex: 1,
    borderRadius: RADIUS.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.glass.border,
    ...SHADOWS.md,
  },
  blur: {
    flex: 1,
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundColor: COLORS.glass.overlayDark,
  },
  lockBlur: {
    padding: SPACING.md,
    borderRadius: RADIUS.round,
  },
  lockIcon: {
    fontSize: LAYOUT.iconSize.xl,
  },
  playingIndicator: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
  },
  playingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  icon: {
    fontSize: LAYOUT.iconSize.emoji,
    marginBottom: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.text.onGlass,
    textAlign: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  premiumText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.text.inverse,
    letterSpacing: 0.5,
  },
});
