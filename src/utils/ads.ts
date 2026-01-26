/**
 * Google AdMob Integration for ZenSounds
 * 
 * Setup steps:
 * 1. Create AdMob account at https://admob.google.com
 * 2. Add iOS app & Android app
 * 3. Create ad units (banner, interstitial)
 * 4. Copy ad unit IDs below
 * 5. Update app.json with app IDs
 */

import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';

// TODO: Replace with your AdMob ad unit IDs
// Use TestIds during development!
const AD_UNITS = {
  ios: {
    banner: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXX/XXXXX',
    interstitial: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-XXXXX/XXXXX',
  },
  android: {
    banner: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXX/XXXXX',
    interstitial: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-XXXXX/XXXXX',
  },
};

const getAdUnits = () => AD_UNITS[Platform.OS as 'ios' | 'android'];

/**
 * Get banner ad unit ID
 */
export function getBannerAdUnitId(): string {
  return getAdUnits().banner;
}

/**
 * Interstitial ad singleton
 */
let interstitialAd: InterstitialAd | null = null;
let isInterstitialLoaded = false;

/**
 * Load interstitial ad (call early, ads take time to load)
 */
export function loadInterstitialAd(): void {
  if (interstitialAd) return;
  
  interstitialAd = InterstitialAd.createForAdRequest(getAdUnits().interstitial, {
    requestNonPersonalizedAdsOnly: true,
  });

  interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
    console.log('Interstitial ad loaded');
    isInterstitialLoaded = true;
  });

  interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
    console.log('Interstitial ad closed');
    isInterstitialLoaded = false;
    // Preload next ad
    interstitialAd?.load();
  });

  interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
    console.error('Interstitial ad error:', error);
    isInterstitialLoaded = false;
  });

  interstitialAd.load();
}

/**
 * Show interstitial ad if loaded
 * Returns true if ad was shown
 */
export async function showInterstitialAd(): Promise<boolean> {
  if (!isInterstitialLoaded || !interstitialAd) {
    console.log('Interstitial not ready');
    return false;
  }

  try {
    await interstitialAd.show();
    return true;
  } catch (error) {
    console.error('Error showing interstitial:', error);
    return false;
  }
}

/**
 * Clean up ads when app unmounts
 */
export function cleanupAds(): void {
  interstitialAd = null;
  isInterstitialLoaded = false;
}

// Re-export BannerAd components for use in JSX
export { BannerAd, BannerAdSize };
