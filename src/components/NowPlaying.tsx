import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, { 
  FadeInDown, 
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useSoundStore } from '../stores/soundStore';
import { SOUNDS } from '../constants/sounds';
import { 
  COLORS, 
  SPACING, 
  TYPOGRAPHY, 
  RADIUS,
  LAYOUT,
  ANIMATION,
  GLASS,
  SHADOWS,
} from '../constants/theme';

// =============================================================================
// CONSTANTS
// =============================================================================

const MAX_VISIBLE_ICONS = 4;

// =============================================================================
// COMPONENT
// =============================================================================

export function NowPlaying() {
  const { playingIds, stopAll } = useSoundStore();
  const stopButtonScale = useSharedValue(1);
  
  const playingSounds = SOUNDS.filter(s => playingIds.includes(s.id));
  const hiddenCount = playingSounds.length - MAX_VISIBLE_ICONS;
  
  const handleStopAll = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    stopButtonScale.value = withSpring(0.85, ANIMATION.spring.soft, () => {
      stopButtonScale.value = withSpring(1, ANIMATION.spring.gentle);
    });
    
    stopAll();
  };

  const stopButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: stopButtonScale.value }],
  }));

  const soundNames = playingSounds.map(s => s.name).join(' · ');

  return (
    <Animated.View 
      entering={FadeInDown.duration(ANIMATION.duration.slow).springify()}
      exiting={FadeOutDown.duration(ANIMATION.duration.fast)}
      style={styles.container}
    >
      {/* Outer glow */}
      <View style={styles.glowEffect} />
      
      {/* Glass panel */}
      <View style={styles.panel}>
        <BlurView intensity={GLASS.blur.heavy} tint="light" style={styles.blur}>
          <View style={styles.content}>
            {/* Playing sounds icons */}
            <View style={styles.soundIcons}>
              {playingSounds.slice(0, MAX_VISIBLE_ICONS).map((sound) => (
                <View key={sound.id} style={styles.iconWrapper}>
                  <Text style={styles.soundIcon}>{sound.icon}</Text>
                </View>
              ))}
              {hiddenCount > 0 && (
                <View style={styles.moreWrapper}>
                  <Text style={styles.moreText}>+{hiddenCount}</Text>
                </View>
              )}
            </View>
            
            {/* Text info */}
            <View style={styles.textContainer}>
              <Text style={styles.nowPlaying}>Now Playing</Text>
              <Text style={styles.soundNames} numberOfLines={1}>
                {soundNames}
              </Text>
            </View>
            
            {/* Stop button */}
            <Pressable onPress={handleStopAll}>
              <Animated.View style={[styles.stopButton, stopButtonStyle]}>
                <BlurView intensity={GLASS.blur.light} tint="light" style={styles.stopBlur}>
                  <Text style={styles.stopIcon}>⏹</Text>
                </BlurView>
              </Animated.View>
            </Pressable>
          </View>
        </BlurView>
      </View>
    </Animated.View>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.lg,
    paddingBottom: LAYOUT.nowPlayingBottomPadding,
  },
  glowEffect: {
    position: 'absolute',
    top: 4,
    left: SPACING.lg + 4,
    right: SPACING.lg + 4,
    bottom: LAYOUT.nowPlayingBottomPadding + 4,
    borderRadius: RADIUS.xxl,
    backgroundColor: COLORS.primary.subtle,
    ...SHADOWS.glow,
  },
  panel: {
    borderRadius: RADIUS.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.glass.border,
    ...SHADOWS.lg,
  },
  blur: {
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  soundIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.glass.light,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },
  soundIcon: {
    fontSize: LAYOUT.iconSize.md,
  },
  moreWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.glass.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.text.secondary,
  },
  textContainer: {
    flex: 1,
    marginLeft: SPACING.xs,
  },
  nowPlaying: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.text.muted,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  soundNames: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.text.primary,
  },
  stopButton: {
    borderRadius: RADIUS.round,
    overflow: 'hidden',
  },
  stopBlur: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 155, 155, 0.3)',
  },
  stopIcon: {
    fontSize: LAYOUT.iconSize.md,
  },
});
