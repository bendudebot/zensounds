import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useSoundStore } from '../stores/soundStore';
import { FREE_SOUNDS_COUNT, PREMIUM_SOUNDS_COUNT } from '../constants/sounds';

const FEATURES = [
  { icon: '🎵', title: `${PREMIUM_SOUNDS_COUNT}+ Premium Sounds`, desc: 'Unlock all sounds' },
  { icon: '🎚️', title: 'Sound Mixer', desc: 'Combine multiple sounds' },
  { icon: '🚫', title: 'No Ads', desc: 'Distraction-free experience' },
  { icon: '⏰', title: 'Custom Timers', desc: 'Set any duration' },
  { icon: '📱', title: 'Widget Support', desc: 'Quick access from home screen' },
  { icon: '🔄', title: 'Background Play', desc: 'Keep playing when app closes' },
];

export default function PremiumScreen() {
  const router = useRouter();
  const { setPremium } = useSoundStore();

  const handlePurchase = async (plan: 'monthly' | 'yearly') => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // TODO: Integrate with RevenueCat for real purchases
    // For now, just simulate a purchase
    console.log(`Purchasing ${plan} plan...`);
    
    // Simulate successful purchase
    setPremium(true);
    router.back();
  };

  const handleRestore = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // TODO: Implement restore purchases with RevenueCat
    console.log('Restoring purchases...');
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
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
          <View style={styles.header}>
            <Text style={styles.emoji}>✨</Text>
            <Text style={styles.title}>ZenSounds Pro</Text>
            <Text style={styles.subtitle}>
              Unlock the full relaxation experience
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {FEATURES.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Pricing */}
          <View style={styles.pricingContainer}>
            {/* Yearly - Best Value */}
            <Pressable 
              style={[styles.priceCard, styles.priceCardBest]}
              onPress={() => handlePurchase('yearly')}
            >
              <View style={styles.bestBadge}>
                <Text style={styles.bestBadgeText}>BEST VALUE</Text>
              </View>
              <Text style={styles.priceTitle}>Yearly</Text>
              <Text style={styles.price}>$29.99</Text>
              <Text style={styles.priceSubtext}>$2.50/month • Save 37%</Text>
            </Pressable>

            {/* Monthly */}
            <Pressable 
              style={styles.priceCard}
              onPress={() => handlePurchase('monthly')}
            >
              <Text style={styles.priceTitle}>Monthly</Text>
              <Text style={styles.price}>$3.99</Text>
              <Text style={styles.priceSubtext}>Billed monthly</Text>
            </Pressable>
          </View>

          {/* Restore */}
          <Pressable style={styles.restoreButton} onPress={handleRestore}>
            <Text style={styles.restoreText}>Restore Purchases</Text>
          </Pressable>

          {/* Terms */}
          <Text style={styles.terms}>
            Payment will be charged to your App Store account. Subscription automatically 
            renews unless canceled at least 24 hours before the end of the current period.
          </Text>
        </ScrollView>
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
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
  },
  featureIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  pricingContainer: {
    gap: 12,
    marginBottom: 24,
  },
  priceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  priceCardBest: {
    borderColor: '#e94560',
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
  },
  bestBadge: {
    position: 'absolute',
    top: -12,
    backgroundColor: '#e94560',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  bestBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    marginTop: 8,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  priceSubtext: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  restoreButton: {
    alignItems: 'center',
    padding: 16,
  },
  restoreText: {
    color: '#e94560',
    fontSize: 16,
  },
  terms: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
});
