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
    
    stopButtonScale.value = withSpring(0.9, ANIMATION.spring.gentle, () => {
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
      entering={FadeInDown.duration(ANIMATION.duration.normal).springify()}
      exiting={FadeOutDown.duration(ANIMATION.duration.fast)}
      style={styles.container}
    >
      <BlurView intensity={80} tint="light" style={styles.blur}>
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
          
          {/* Playing text */}
          <View style={styles.textContainer}>
            <Text style={styles.nowPlaying}>Now Playing</Text>
            <Text style={styles.soundNames} numberOfLines={1}>
              {soundNames}
            </Text>
          </View>
          
          {/* Stop button */}
          <Pressable onPress={handleStopAll}>
            <Animated.View style={[styles.stopButton, stopButtonStyle]}>
              <Text style={styles.stopIcon}>⏹</Text>
            </Animated.View>
          </Pressable>
        </View>
      </BlurView>
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
  blur: {
    borderRadius: RADIUS.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.white[20],
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundIcon: {
    fontSize: LAYOUT.iconSize.md,
  },
  moreWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {
    fontSize: TYPOGRAPHY.size.xs,
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
    letterSpacing: 0.5,
  },
  soundNames: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.text.primary,
  },
  stopButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.error,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  stopIcon: {
    fontSize: LAYOUT.iconSize.md,
    color: COLORS.text.inverse,
  },
});
