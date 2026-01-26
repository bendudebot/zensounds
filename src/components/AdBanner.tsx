import { View, StyleSheet, Text } from 'react-native';
import { BannerAd, BannerAdSize, getBannerAdUnitId } from '../utils/ads';
import { useSoundStore } from '../stores/soundStore';

/**
 * Ad Banner component - only shows for free users
 */
export function AdBanner() {
  const isPremium = useSoundStore((state) => state.isPremium);
  
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

/**
 * Placeholder for development/testing
 */
export function AdBannerPlaceholder() {
  const isPremium = useSoundStore((state) => state.isPremium);
  
  if (isPremium) return null;
  
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>📢 Ad Banner</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  placeholderText: {
    color: '#666',
    fontSize: 12,
  },
});
