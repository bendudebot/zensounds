# 🚀 ZenSounds Setup Guide

Complete guide to launch ZenSounds on iOS and Android.

## 📋 Pre-requisites

- [ ] Apple Developer Account ($99/year) - https://developer.apple.com
- [ ] Google Play Developer Account ($25 one-time) - https://play.google.com/console
- [ ] RevenueCat Account (free) - https://app.revenuecat.com
- [ ] AdMob Account (free) - https://admob.google.com
- [ ] Expo Account (free) - https://expo.dev
- [ ] Mac with Xcode (for iOS builds)

---

## 1️⃣ Sound Files Setup

### Download Sounds (Free Sources)
1. Go to https://freesound.org (create free account)
2. Search and download these sounds:
   - Rain (loopable, 1-2 min)
   - Thunder
   - Ocean waves
   - Fan/AC noise
   - White noise
   - Birds chirping
   - Forest ambiance
   - River/stream
   - Wind
   - Campfire
   - Coffee shop ambiance
   - Library/quiet room

### Process Sounds
```bash
# Use Audacity or ffmpeg to:
# 1. Make sounds loopable (fade in/out)
# 2. Normalize volume levels
# 3. Export as MP3 (128kbps for balance of quality/size)
# 4. Keep files under 2MB each
```

### Host Sounds
Option A: **Cloudinary** (free tier: 25GB)
1. Sign up at https://cloudinary.com
2. Upload sounds
3. Copy URLs to `src/constants/sounds.ts`

Option B: **AWS S3 + CloudFront**
1. Create S3 bucket
2. Enable CloudFront CDN
3. Upload sounds
4. Use CloudFront URLs

---

## 2️⃣ RevenueCat Setup (In-App Purchases)

### Create RevenueCat Project
1. Log into https://app.revenuecat.com
2. Create new project: "ZenSounds"
3. Note your **Project ID**

### Add iOS App
1. In RevenueCat: Apps → Add New → iOS
2. Enter App Store Connect App ID (create app first)
3. Copy **iOS API Key** → paste in `src/utils/purchases.ts`

### Add Android App
1. In RevenueCat: Apps → Add New → Android
2. Enter Google Play package name: `com.bendudebot.zensounds`
3. Copy **Android API Key** → paste in `src/utils/purchases.ts`

### Create Products in App Store Connect
1. Go to https://appstoreconnect.apple.com
2. My Apps → Create New App
3. App Information → In-App Purchases
4. Create subscriptions:
   - `zensounds_pro_monthly` - $3.99/month
   - `zensounds_pro_yearly` - $29.99/year

### Create Products in Google Play Console
1. Go to https://play.google.com/console
2. Create app → Monetize → Subscriptions
3. Create same products:
   - `zensounds_pro_monthly` - $3.99/month
   - `zensounds_pro_yearly` - $29.99/year

### Link Products in RevenueCat
1. Products → Add Product
2. Link App Store and Play Store products
3. Create Entitlement: "pro"
4. Add products to entitlement
5. Create Offering: "default"
6. Add packages: $rc_monthly, $rc_annual

---

## 3️⃣ AdMob Setup (Ads)

### Create AdMob Account
1. Sign up at https://admob.google.com
2. Add iOS app: `com.bendudebot.zensounds`
3. Add Android app: `com.bendudebot.zensounds`

### Create Ad Units
For EACH platform (iOS + Android):
1. Banner Ad → Copy Ad Unit ID
2. Interstitial Ad → Copy Ad Unit ID

### Update Code
1. Edit `app.json`:
```json
"plugins": [
  ["react-native-google-mobile-ads", {
    "androidAppId": "ca-app-pub-XXXXXXXX~XXXXXXXX",
    "iosAppId": "ca-app-pub-XXXXXXXX~XXXXXXXX"
  }]
]
```

2. Edit `src/utils/ads.ts`:
```typescript
const AD_UNITS = {
  ios: {
    banner: 'ca-app-pub-XXXXX/XXXXX',
    interstitial: 'ca-app-pub-XXXXX/XXXXX',
  },
  android: {
    banner: 'ca-app-pub-XXXXX/XXXXX',
    interstitial: 'ca-app-pub-XXXXX/XXXXX',
  },
};
```

---

## 4️⃣ App Icons & Screenshots

### Create Icons
Use https://appicon.co or Figma:
- iOS: 1024x1024 PNG (no transparency)
- Android: 512x512 PNG (with transparency OK)
- Adaptive Icon: 108x108dp foreground + background

### Create Screenshots
Sizes needed:
- iPhone 6.7" (1290x2796)
- iPhone 6.5" (1284x2778)
- iPhone 5.5" (1242x2208)
- iPad 12.9" (2048x2732)
- Android Phone (1080x1920)
- Android Tablet (1200x1920)

---

## 5️⃣ Build & Submit

### Install Expo CLI
```bash
npm install -g eas-cli
eas login
```

### Configure Build
```bash
cd zensounds
eas build:configure
```

### Build for iOS
```bash
eas build --platform ios
```

### Build for Android
```bash
eas build --platform android
```

### Submit to Stores
```bash
# iOS
eas submit --platform ios

# Android
eas submit --platform android
```

---

## 6️⃣ App Store Optimization (ASO)

### iOS App Store
**Title:** ZenSounds - Sleep & Focus
**Subtitle:** White Noise, Rain, Nature
**Keywords:** sleep sounds, white noise, rain sounds, focus, meditation, relax, nature sounds, sleep aid, ambient, peaceful

### Google Play
**Title:** ZenSounds: Sleep Sounds & White Noise
**Short Description:** Relax, focus & sleep better with calming ambient sounds
**Full Description:** (expand on features, benefits)

### Categories
- iOS: Health & Fitness
- Android: Health & Fitness / Lifestyle

---

## 🚀 Launch Checklist

- [ ] All sounds uploaded and URLs configured
- [ ] RevenueCat API keys added
- [ ] AdMob IDs configured
- [ ] App icons created
- [ ] Screenshots ready
- [ ] Privacy Policy URL
- [ ] Support URL/Email
- [ ] App Review description prepared
- [ ] Test purchases work
- [ ] Test ads show correctly
- [ ] Background audio works
- [ ] Submit for review!

---

## 📊 Post-Launch

1. Monitor RevenueCat dashboard for revenue
2. Monitor AdMob for ad revenue
3. Respond to user reviews
4. Plan updates (new sounds, features)
5. Consider ProductHunt launch for visibility

Good luck! 🎉
