import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SoundCard } from '../components/SoundCard';
import { CategoryHeader } from '../components/CategoryHeader';
import { NowPlaying } from '../components/NowPlaying';
import { TimerButton } from '../components/TimerButton';
import { useSoundStore } from '../stores/soundStore';
import { SOUNDS, CATEGORIES } from '../constants/sounds';

export default function HomeScreen() {
  const router = useRouter();
  const { playingIds, isPremium } = useSoundStore();

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good evening</Text>
            <Text style={styles.title}>ZenSounds</Text>
          </View>
          <View style={styles.headerButtons}>
            <TimerButton />
            {!isPremium && (
              <Pressable 
                style={styles.premiumBtn}
                onPress={() => router.push('/premium')}
              >
                <Text style={styles.premiumText}>PRO</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Sound Categories */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {CATEGORIES.map((category) => (
            <View key={category.id} style={styles.categorySection}>
              <CategoryHeader 
                title={category.name} 
                icon={category.icon}
              />
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.soundsRow}
              >
                {SOUNDS.filter(s => s.category === category.id).map((sound) => (
                  <SoundCard
                    key={sound.id}
                    sound={sound}
                    isPlaying={playingIds.includes(sound.id)}
                    isPremium={sound.premium}
                    isLocked={sound.premium && !isPremium}
                  />
                ))}
              </ScrollView>
            </View>
          ))}
          
          {/* Spacer for NowPlaying bar */}
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Now Playing Bar */}
        {playingIds.length > 0 && <NowPlaying />}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  premiumBtn: {
    backgroundColor: '#e94560',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  premiumText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 24,
  },
  soundsRow: {
    paddingHorizontal: 20,
    gap: 12,
  },
});
