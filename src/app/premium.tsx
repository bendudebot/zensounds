import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
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
  { icon: '🚫', title: 'No Ads', desc: 'Pure, distraction-free experience' },
  { icon: '⏰', title: 'Advanced Timers', desc: 'Custom durations & schedules' },
  { icon: '🌙', title: 'Background Play', desc: 'Continues when you sleep' },
] as const;

// Fallback prices for dev mode
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
        if (success) {
          handleSuccess();
        }
      } else {
        // Dev mode fallback
        handleSuccess();
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

  // Find packages
  const monthlyPkg = packages.find(p => p.identifier === '$rc_monthly');
  const yearlyPkg = packages.find(p => p.identifier === '$rc_annual');
  const hasPackages = packages.length > 0;

  return (
    <LinearGradient
      colors={[COLORS.background.start, COLORS.background.middle, COLORS.background.end]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Close button */}
        <Pressable 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeIn.duration(ANIMATION.duration.slow)} style={styles.header}>
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
                style={styles.featureRow}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </View>
              </Animated.View>
            ))}
          </View>

          {/* Pricing */}
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary.main} style={styles.loader} />
          ) : (
            <Animated.View 
              entering={FadeInUp.delay(400).duration(ANIMATION.duration.normal)}
              style={styles.pricingContainer}
            >
              {/* Yearly - Best Value */}
              <Pressable 
                style={[styles.priceCard, styles.priceCardBest]}
                onPress={() => handlePurchase(yearlyPkg)}
                disabled={purchasing}
              >
                <View style={styles.bestBadge}>
                  <Text style={styles.bestBadgeText}>BEST VALUE</Text>
                </View>
                <Text style={styles.priceTitle}>Yearly</Text>
                <Text style={styles.price}>
                  {hasPackages && yearlyPkg ? yearlyPkg.product.priceString : FALLBACK_YEARLY_PRICE}
                </Text>
                <Text style={styles.priceSubtext}>
                  ${YEARLY_MONTHLY_EQUIVALENT.toFixed(2)}/month · Save {YEARLY_SAVINGS_PERCENT}%
                </Text>
              </Pressable>

              {/* Monthly */}
              <Pressable 
                style={styles.priceCard}
                onPress={() => handlePurchase(monthlyPkg)}
                disabled={purchasing}
              >
                <Text style={styles.priceTitle}>Monthly</Text>
                <Text style={styles.price}>
                  {hasPackages && monthlyPkg ? monthlyPkg.product.priceString : FALLBACK_MONTHLY_PRICE}
                </Text>
                <Text style={styles.priceSubtext}>Billed monthly</Text>
              </Pressable>
            </Animated.View>
          )}

          {/* Purchasing overlay */}
          {purchasing && (
            <View style={styles.purchasingOverlay}>
              <ActivityIndicator size="large" color={COLORS.primary.main} />
              <Text style={styles.purchasingText}>Processing...</Text>
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
  closeButton: {
    position: 'absolute',
    top: 60,
    right: SPACING.xl,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: { 
    fontSize: TYPOGRAPHY.size.lg, 
    color: COLORS.text.secondary,
  },
  scrollView: { 
    flex: 1,
  },
  scrollContent: { 
    padding: SPACING.xl, 
    paddingTop: SPACING.section,
  },
  header: { 
    alignItems: 'center', 
    marginBottom: SPACING.xxxl,
  },
  emoji: { 
    fontSize: 64, 
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
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.card,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    ...SHADOWS.sm,
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
    gap: SPACING.md, 
    marginBottom: SPACING.xxl,
  },
  priceCard: {
    backgroundColor: COLORS.background.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.md,
  },
  priceCardBest: {
    borderColor: COLORS.primary.main,
    backgroundColor: COLORS.primary[50],
  },
  bestBadge: {
    position: 'absolute',
    top: -12,
    backgroundColor: COLORS.primary.main,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.round,
  },
  bestBadgeText: { 
    color: COLORS.text.inverse, 
    fontSize: TYPOGRAPHY.size.xs, 
    fontWeight: TYPOGRAPHY.weight.bold,
    letterSpacing: 0.5,
  },
  priceTitle: { 
    fontSize: TYPOGRAPHY.size.xl, 
    fontWeight: TYPOGRAPHY.weight.semibold, 
    color: COLORS.text.primary, 
    marginBottom: SPACING.sm, 
    marginTop: SPACING.sm,
  },
  price: { 
    fontSize: 36, 
    fontWeight: TYPOGRAPHY.weight.bold, 
    color: COLORS.text.primary, 
    marginBottom: SPACING.xs,
  },
  priceSubtext: { 
    fontSize: TYPOGRAPHY.size.md, 
    color: COLORS.text.secondary,
  },
  purchasingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.background.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.xl,
  },
  purchasingText: { 
    color: COLORS.text.primary, 
    marginTop: SPACING.lg, 
    fontSize: TYPOGRAPHY.size.lg,
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
    lineHeight: 18,
    paddingHorizontal: SPACING.lg,
  },
});
