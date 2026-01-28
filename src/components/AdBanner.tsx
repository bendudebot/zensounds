import { View, StyleSheet, Text } from 'react-native';

import { BannerAd, BannerAdSize, getBannerAdUnitId } from '../utils/ads';
import { useSoundStore, selectIsPremium } from '../stores/soundStore';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from '../constants/theme';

// =============================================================================
// AD BANNER - Production
// =============================================================================

/**
 * Ad Banner component - only shows for free users
 */
export function AdBanner() {
  const isPremium = useSoundStore(selectIsPremium);
  
  // Don't show ads to premium users
  if (isPremium) {
    return null;
  }

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={getBannerAdUnitId()}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => {
          console.log('Banner ad failed to load:', error);
        }}
      />
    </View>
  );
}

// =============================================================================
// AD BANNER PLACEHOLDER - Development
// =============================================================================

/**
 * Placeholder for development/testing
 */
export function AdBannerPlaceholder() {
  const isPremium = useSoundStore(selectIsPremium);
  
  if (isPremium) {
    return null;
  }
  
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>📢 Ad Banner</Text>
    </View>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    backgroundColor: COLORS.neutral[100],
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    borderRadius: RADIUS.md,
    marginHorizontal: SPACING.lg,
  },
  placeholderText: {
    color: COLORS.text.muted,
    fontSize: TYPOGRAPHY.size.sm,
  },
});
