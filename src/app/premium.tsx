import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { PurchasesPackage } from 'react-native-purchases';

import { useSoundStore } from '../stores/soundStore';
import { getOfferings, purchasePackage, restorePurchases } from '../utils/purchases';
import { PREMIUM_SOUNDS_COUNT } from '../constants/sounds';
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  RADIUS,
  SHADOWS,
  ANIMATION,
  LAYOUT,
  GLASS,
} from '../constants/theme';

// =============================================================================
// CONSTANTS
// =============================================================================

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

const FEATURES: readonly Feature[] = [
  { icon: '🎵', title: `${PREMIUM_SOUNDS_COUNT}+ Premium Sounds`, desc: 'Unlock the full sound library' },
  { icon: '🎚️', title: 'Sound Mixer', desc: 'Create your perfect blend' },
  { icon: '🚫', title: 'Ad-Free Experience', desc: 'Pure, distraction-free calm' },
  { icon: '⏰', title: 'Advanced Timers', desc: 'Custom durations & schedules' },
  { icon: '🌙', title: 'Background Play', desc: 'Continues while you sleep' },
] as const;

const FALLBACK_YEARLY_PRICE = '$29.99';
const FALLBACK_MONTHLY_PRICE = '$3.99';
const YEARLY_MONTHLY_EQUIVALENT = 2.50;
const YEARLY_SAVINGS_PERCENT = 37;

// =============================================================================
// COMPONENT
// =============================================================================

export default function PremiumScreen() {
  const router = useRouter();
  const { setPremium } = useSoundStore();
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    loadOfferings();
  }, []);

  const loadOfferings = async () => {
    try {
      const offerings = await getOfferings();
      setPackages(offerings);
    } catch (error) {
      console.error('Error loading offerings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (pkg?: PurchasesPackage) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPurchasing(true);
    
    try {
      if (pkg) {
        const success = await purchasePackage(pkg);
        if (success) handleSuccess();
      } else {
        handleSuccess(); // Dev mode
      }
    } catch (error) {
      console.error('Purchase error:', error);
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPurchasing(true);
    
    try {
      const restored = await restorePurchases();
      if (restored) {
        handleSuccess();
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
    } catch (error) {
      console.error('Restore error:', error);
    } finally {
      setPurchasing(false);
    }
  };

  const handleSuccess = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setPremium(true);
    router.back();
  };

  const monthlyPkg = packages.find(p => p.identifier === '$rc_monthly');
  const yearlyPkg = packages.find(p => p.identifier === '$rc_annual');
  const hasPackages = packages.length > 0;

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
        {/* Close button */}
        <Animated.View entering={FadeIn.delay(200)} style={styles.closeWrapper}>
          <Pressable onPress={() => router.back()}>
            <BlurView intensity={GLASS.blur.medium} tint="light" style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </BlurView>
          </Pressable>
        </Animated.View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeIn.duration(ANIMATION.duration.gentle)} style={styles.header}>
            <Text style={styles.emoji}>✨</Text>
            <Text style={styles.title}>ZenSounds Pro</Text>
            <Text style={styles.subtitle}>
              Unlock the full relaxation experience
            </Text>
          </Animated.View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {FEATURES.map((feature, index) => (
              <Animated.View 
                key={feature.title}
                entering={FadeInUp.delay(index * 80).duration(ANIMATION.duration.normal)}
              >
                <View style={styles.featureCard}>
                  <BlurView intensity={GLASS.blur.light} tint="light" style={styles.featureBlur}>
                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                    <View style={styles.featureText}>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureDesc}>{feature.desc}</Text>
                    </View>
                  </BlurView>
                </View>
              </Animated.View>
            ))}
          </View>

          {/* Pricing */}
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary.main} style={styles.loader} />
          ) : (
            <Animated.View 
              entering={FadeInUp.delay(FEATURES.length * 80).duration(ANIMATION.duration.normal)}
              style={styles.pricingContainer}
            >
              {/* Yearly - Best Value */}
              <Pressable 
                style={styles.priceCardWrapper}
                onPress={() => handlePurchase(yearlyPkg)}
                disabled={purchasing}
              >
                <View style={styles.bestBadge}>
                  <BlurView intensity={GLASS.blur.medium} tint="light" style={styles.bestBadgeBlur}>
                    <Text style={styles.bestBadgeText}>BEST VALUE</Text>
                  </BlurView>
                </View>
                <BlurView intensity={GLASS.blur.medium} tint="light" style={styles.priceCardBest}>
                  <Text style={styles.priceTitle}>Yearly</Text>
                  <Text style={styles.price}>
                    {hasPackages && yearlyPkg ? yearlyPkg.product.priceString : FALLBACK_YEARLY_PRICE}
                  </Text>
                  <Text style={styles.priceSubtext}>
                    ${YEARLY_MONTHLY_EQUIVALENT.toFixed(2)}/month · Save {YEARLY_SAVINGS_PERCENT}%
                  </Text>
                </BlurView>
              </Pressable>

              {/* Monthly */}
              <Pressable 
                style={styles.priceCardWrapper}
                onPress={() => handlePurchase(monthlyPkg)}
                disabled={purchasing}
              >
                <BlurView intensity={GLASS.blur.light} tint="light" style={styles.priceCard}>
                  <Text style={styles.priceTitle}>Monthly</Text>
                  <Text style={styles.price}>
                    {hasPackages && monthlyPkg ? monthlyPkg.product.priceString : FALLBACK_MONTHLY_PRICE}
                  </Text>
                  <Text style={styles.priceSubtext}>Billed monthly</Text>
                </BlurView>
              </Pressable>
            </Animated.View>
          )}

          {/* Purchasing overlay */}
          {purchasing && (
            <View style={styles.purchasingOverlay}>
              <BlurView intensity={GLASS.blur.heavy} tint="light" style={styles.purchasingBlur}>
                <ActivityIndicator size="large" color={COLORS.primary.main} />
                <Text style={styles.purchasingText}>Processing...</Text>
              </BlurView>
            </View>
          )}

          {/* Restore */}
          <Pressable 
            style={styles.restoreButton} 
            onPress={handleRestore}
            disabled={purchasing}
          >
            <Text style={styles.restoreText}>Restore Purchases</Text>
          </Pressable>

          {/* Terms */}
          <Text style={styles.terms}>
            Payment will be charged to your App Store account. Subscription 
            automatically renews unless canceled at least 24 hours before 
            the end of the current period.
          </Text>
        </ScrollView>
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
  closeWrapper: {
    position: 'absolute',
    top: 60,
    right: LAYOUT.screenPadding,
    zIndex: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  closeIcon: { 
    fontSize: TYPOGRAPHY.size.lg, 
    color: COLORS.text.secondary,
  },
  scrollView: { 
    flex: 1,
  },
  scrollContent: { 
    padding: LAYOUT.screenPadding, 
    paddingTop: SPACING.section,
  },
  header: { 
    alignItems: 'center', 
    marginBottom: SPACING.xxxl,
  },
  emoji: { 
    fontSize: 72, 
    marginBottom: SPACING.lg,
  },
  title: { 
    fontSize: TYPOGRAPHY.size.display, 
    fontWeight: TYPOGRAPHY.weight.bold, 
    color: COLORS.text.primary, 
    marginBottom: SPACING.sm,
    letterSpacing: -0.5,
  },
  subtitle: { 
    fontSize: TYPOGRAPHY.size.lg, 
    color: COLORS.text.secondary, 
    textAlign: 'center',
  },
  featuresContainer: { 
    marginBottom: SPACING.xxxl,
    gap: SPACING.md,
  },
  featureCard: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.glass.border,
    ...SHADOWS.sm,
  },
  featureBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  featureIcon: { 
    fontSize: LAYOUT.iconSize.xl, 
    marginRight: SPACING.lg,
  },
  featureText: { 
    flex: 1,
  },
  featureTitle: { 
    fontSize: TYPOGRAPHY.size.lg, 
    fontWeight: TYPOGRAPHY.weight.semibold, 
    color: COLORS.text.primary, 
    marginBottom: 2,
  },
  featureDesc: { 
    fontSize: TYPOGRAPHY.size.md, 
    color: COLORS.text.secondary,
  },
  loader: {
    marginVertical: SPACING.section,
  },
  pricingContainer: { 
    gap: SPACING.lg, 
    marginBottom: SPACING.xxl,
  },
  priceCardWrapper: {
    borderRadius: RADIUS.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.glass.border,
    ...SHADOWS.md,
  },
  priceCard: {
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  priceCardBest: {
    padding: SPACING.xxl,
    alignItems: 'center',
    backgroundColor: COLORS.primary.subtle,
    borderWidth: 2,
    borderColor: COLORS.primary.light,
    borderRadius: RADIUS.xxl - 1,
  },
  bestBadge: {
    position: 'absolute',
    top: -14,
    alignSelf: 'center',
    zIndex: 10,
    borderRadius: RADIUS.round,
    overflow: 'hidden',
  },
  bestBadgeBlur: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.primary.main,
  },
  bestBadgeText: { 
    color: COLORS.text.inverse, 
    fontSize: TYPOGRAPHY.size.xs, 
    fontWeight: TYPOGRAPHY.weight.bold,
    letterSpacing: 0.8,
  },
  priceTitle: { 
    fontSize: TYPOGRAPHY.size.xl, 
    fontWeight: TYPOGRAPHY.weight.semibold, 
    color: COLORS.text.primary, 
    marginBottom: SPACING.sm, 
    marginTop: SPACING.sm,
  },
  price: { 
    fontSize: 40, 
    fontWeight: TYPOGRAPHY.weight.bold, 
    color: COLORS.text.primary, 
    marginBottom: SPACING.xs,
    letterSpacing: -1,
  },
  priceSubtext: { 
    fontSize: TYPOGRAPHY.size.md, 
    color: COLORS.text.secondary,
  },
  purchasingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  purchasingBlur: {
    padding: SPACING.xxxl,
    borderRadius: RADIUS.xxl,
    alignItems: 'center',
  },
  purchasingText: { 
    color: COLORS.text.primary, 
    marginTop: SPACING.lg, 
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  restoreButton: { 
    alignItems: 'center', 
    padding: SPACING.lg,
  },
  restoreText: { 
    color: COLORS.primary.main, 
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  terms: { 
    fontSize: TYPOGRAPHY.size.sm, 
    color: COLORS.text.muted, 
    textAlign: 'center', 
    lineHeight: 20,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.huge,
  },
});
