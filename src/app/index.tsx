import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { SoundCard } from '../components/SoundCard';
import { CategoryHeader } from '../components/CategoryHeader';
import { NowPlaying } from '../components/NowPlaying';
import { TimerButton } from '../components/TimerButton';
import { useSoundStore } from '../stores/soundStore';
import { CATEGORIES, getSoundsByCategory } from '../constants/sounds';
import { 
  COLORS, 
  SPACING, 
  TYPOGRAPHY, 
  RADIUS, 
  LAYOUT,
  GLASS,
  SHADOWS,
  ANIMATION,
} from '../constants/theme';

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
      colors={[
        COLORS.background.gradientStart,
        COLORS.background.gradientMiddle,
        COLORS.background.gradientEnd,
      ]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View 
          entering={FadeIn.duration(ANIMATION.duration.gentle)} 
          style={styles.header}
        >
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
                <BlurView intensity={GLASS.blur.medium} tint="light" style={styles.premiumBlur}>
                  <Text style={styles.premiumText}>✨ PRO</Text>
                </BlurView>
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
                entering={FadeInDown.delay(index * 120).duration(ANIMATION.duration.slow)}
                style={styles.categorySection}
              >
                <CategoryHeader 
                  title={category.name} 
                  icon={category.icon}
                  description={category.description}
                />
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.soundsRow}
                >
                  {categorySounds.map((sound, soundIndex) => (
                    <Animated.View
                      key={sound.id}
                      entering={FadeIn.delay((index * 120) + (soundIndex * 50)).duration(ANIMATION.duration.normal)}
                    >
                      <SoundCard
                        sound={sound}
                        isPlaying={playingIds.includes(sound.id)}
                        isPremium={sound.premium}
                        isLocked={sound.premium && !isPremium}
                      />
                    </Animated.View>
                  ))}
                </ScrollView>
              </Animated.View>
            );
          })}
          
          {/* Bottom spacer */}
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
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  greeting: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: TYPOGRAPHY.size.display,
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
    borderRadius: RADIUS.round,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  premiumBlur: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  premiumText: {
    color: COLORS.accent,
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
    marginBottom: SPACING.section,
  },
  soundsRow: {
    paddingHorizontal: LAYOUT.screenPadding,
    gap: SPACING.lg,
  },
  bottomSpacer: {
    height: LAYOUT.nowPlayingHeight + LAYOUT.nowPlayingBottomPadding + SPACING.xxl,
  },
});
