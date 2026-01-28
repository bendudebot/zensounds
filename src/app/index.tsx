import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

import { SoundCard } from '../components/SoundCard';
import { CategoryHeader } from '../components/CategoryHeader';
import { NowPlaying } from '../components/NowPlaying';
import { TimerButton } from '../components/TimerButton';
import { useSoundStore } from '../stores/soundStore';
import { SOUNDS, CATEGORIES, getSoundsByCategory } from '../constants/sounds';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, LAYOUT } from '../constants/theme';

// =============================================================================
// HELPERS
// =============================================================================

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 5) return 'Good night';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function HomeScreen() {
  const router = useRouter();
  const { playingIds, isPremium } = useSoundStore();

  return (
    <LinearGradient
      colors={[COLORS.background.start, COLORS.background.middle, COLORS.background.end]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.title}>ZenSounds</Text>
          </View>
          <View style={styles.headerButtons}>
            <TimerButton />
            {!isPremium && (
              <Pressable 
                style={styles.premiumBtn}
                onPress={() => router.push('/premium')}
              >
                <Text style={styles.premiumText}>✨ PRO</Text>
              </Pressable>
            )}
          </View>
        </Animated.View>

        {/* Sound Categories */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {CATEGORIES.map((category, index) => {
            const categorySounds = getSoundsByCategory(category.id);
            
            return (
              <Animated.View 
                key={category.id} 
                entering={FadeIn.delay(index * 100).duration(500)}
                style={styles.categorySection}
              >
                <CategoryHeader 
                  title={category.name} 
                  icon={category.icon}
                />
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.soundsRow}
                >
                  {categorySounds.map((sound) => (
                    <SoundCard
                      key={sound.id}
                      sound={sound}
                      isPlaying={playingIds.includes(sound.id)}
                      isPremium={sound.premium}
                      isLocked={sound.premium && !isPremium}
                    />
                  ))}
                </ScrollView>
              </Animated.View>
            );
          })}
          
          {/* Bottom spacer for NowPlaying bar */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Now Playing Bar */}
        {playingIds.length > 0 && <NowPlaying />}
      </SafeAreaView>
    </LinearGradient>
  );
}

// =============================================================================
// STYLES
// =============================================================================

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
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  greeting: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xxxl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.text.primary,
    letterSpacing: -0.5,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  premiumBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.round,
  },
  premiumText: {
    color: COLORS.text.inverse,
    fontWeight: TYPOGRAPHY.weight.semibold,
    fontSize: TYPOGRAPHY.size.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SPACING.sm,
  },
  categorySection: {
    marginBottom: SPACING.xxxl,
  },
  soundsRow: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
  },
  bottomSpacer: {
    height: LAYOUT.nowPlayingHeight + LAYOUT.nowPlayingBottomPadding + SPACING.xl,
  },
});
