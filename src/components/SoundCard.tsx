import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useSoundStore } from '../stores/soundStore';
import { Sound } from '../constants/sounds';

interface SoundCardProps {
  sound: Sound;
  isPlaying: boolean;
  isPremium: boolean;
  isLocked: boolean;
}

export function SoundCard({ sound, isPlaying, isPremium, isLocked }: SoundCardProps) {
  const { toggleSound } = useSoundStore();
  const scale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.3);

  const handlePress = async () => {
    if (isLocked) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      // TODO: Show premium modal
      return;
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    
    toggleSound(sound.id);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: isPlaying ? withRepeat(
      withTiming(0.8, { duration: 1000 }),
      -1,
      true
    ) : 0,
  }));

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <LinearGradient
          colors={isPlaying ? sound.activeGradient : sound.gradient}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Playing indicator pulse */}
          <Animated.View style={[styles.pulse, pulseStyle]} />
          
          {/* Lock icon for premium */}
          {isLocked && (
            <View style={styles.lockBadge}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          )}
          
          {/* Icon */}
          <Text style={styles.icon}>{sound.icon}</Text>
          
          {/* Name */}
          <Text style={styles.name}>{sound.name}</Text>
          
          {/* Premium badge */}
          {isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>PRO</Text>
            </View>
          )}
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  pulse: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  lockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  lockIcon: {
    fontSize: 16,
  },
  premiumBadge: {
    position: 'absolute',
    bottom: 8,
    backgroundColor: '#e94560',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
