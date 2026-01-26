import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSoundStore } from '../stores/soundStore';
import { SOUNDS } from '../constants/sounds';

export function NowPlaying() {
  const { playingIds, stopAll, volumes, setVolume } = useSoundStore();
  
  const playingSounds = SOUNDS.filter(s => playingIds.includes(s.id));
  
  const handleStopAll = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    stopAll();
  };

  return (
    <Animated.View 
      entering={FadeInDown}
      exiting={FadeOutDown}
      style={styles.container}
    >
      <BlurView intensity={80} tint="dark" style={styles.blur}>
        <View style={styles.content}>
          {/* Playing sounds icons */}
          <View style={styles.soundIcons}>
            {playingSounds.slice(0, 4).map((sound) => (
              <Text key={sound.id} style={styles.soundIcon}>
                {sound.icon}
              </Text>
            ))}
            {playingSounds.length > 4 && (
              <Text style={styles.moreText}>+{playingSounds.length - 4}</Text>
            )}
          </View>
          
          {/* Playing text */}
          <View style={styles.textContainer}>
            <Text style={styles.nowPlaying}>Now Playing</Text>
            <Text style={styles.soundNames} numberOfLines={1}>
              {playingSounds.map(s => s.name).join(' • ')}
            </Text>
          </View>
          
          {/* Stop button */}
          <Pressable style={styles.stopButton} onPress={handleStopAll}>
            <Text style={styles.stopIcon}>⏹</Text>
          </Pressable>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  blur: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  soundIcons: {
    flexDirection: 'row',
    gap: 4,
  },
  soundIcon: {
    fontSize: 24,
  },
  moreText: {
    fontSize: 12,
    color: '#a0a0a0',
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
  },
  nowPlaying: {
    fontSize: 12,
    color: '#a0a0a0',
    marginBottom: 2,
  },
  soundNames: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  stopButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(233, 69, 96, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopIcon: {
    fontSize: 20,
  },
});
