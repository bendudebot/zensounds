/**
 * RevenueCat Integration for ZenSounds
 * 
 * Setup steps:
 * 1. Create account at https://app.revenuecat.com
 * 2. Create new project "ZenSounds"
 * 3. Add iOS app (bundle: com.bendudebot.zensounds)
 * 4. Add Android app (package: com.bendudebot.zensounds)
 * 5. Create products in App Store Connect / Google Play Console
 * 6. Copy API keys below
 */

import Purchases, { 
  PurchasesPackage, 
  CustomerInfo,
  LOG_LEVEL,
} from 'react-native-purchases';
import { Platform } from 'react-native';

// TODO: Replace with your RevenueCat API keys
const API_KEYS = {
  ios: 'appl_YOUR_IOS_API_KEY',
  android: 'goog_YOUR_ANDROID_API_KEY',
};

// Product identifiers (create these in App Store Connect / Play Console)
export const PRODUCTS = {
  MONTHLY: 'zensounds_pro_monthly',    // $3.99/month
  YEARLY: 'zensounds_pro_yearly',      // $29.99/year
  LIFETIME: 'zensounds_pro_lifetime',  // $79.99 one-time (optional)
};

// Entitlement identifier (create in RevenueCat dashboard)
export const ENTITLEMENTS = {
  PRO: 'pro',
};

/**
 * Initialize RevenueCat SDK
 * Call this in your app's entry point (_layout.tsx)
 */
export async function initializePurchases(): Promise<void> {
  try {
    Purchases.setLogLevel(LOG_LEVEL.DEBUG); // Remove in production
    
    const apiKey = Platform.OS === 'ios' ? API_KEYS.ios : API_KEYS.android;
    await Purchases.configure({ apiKey });
    
    console.log('RevenueCat initialized successfully');
  } catch (error) {
    console.error('Failed to initialize RevenueCat:', error);
  }
}

/**
 * Check if user has active pro subscription
 */
export async function checkProStatus(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.entitlements.active[ENTITLEMENTS.PRO] !== undefined;
  } catch (error) {
    console.error('Error checking pro status:', error);
    return false;
  }
}

/**
 * Get available subscription packages
 */
export async function getOfferings(): Promise<PurchasesPackage[]> {
  try {
    const offerings = await Purchases.getOfferings();
    
    if (offerings.current?.availablePackages) {
      return offerings.current.availablePackages;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching offerings:', error);
    return [];
  }
}

/**
 * Purchase a subscription package
 */
export async function purchasePackage(pkg: PurchasesPackage): Promise<boolean> {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    
    // Check if purchase was successful
    if (customerInfo.entitlements.active[ENTITLEMENTS.PRO]) {
      console.log('Purchase successful! User is now Pro.');
      return true;
    }
    
    return false;
  } catch (error: any) {
    if (error.userCancelled) {
      console.log('User cancelled purchase');
    } else {
      console.error('Purchase error:', error);
    }
    return false;
  }
}

/**
 * Restore previous purchases
 */
export async function restorePurchases(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo.entitlements.active[ENTITLEMENTS.PRO] !== undefined;
  } catch (error) {
    console.error('Error restoring purchases:', error);
    return false;
  }
}

/**
 * Listen for customer info updates
 */
export function addCustomerInfoListener(
  callback: (info: CustomerInfo) => void
): () => void {
  const listener = Purchases.addCustomerInfoUpdateListener(callback);
  return () => listener.remove();
}
