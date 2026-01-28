/**
 * ZenSounds Theme Constants
 * 
 * Design Philosophy: Apple Glassmorphism
 * Inspired by iOS Weather, visionOS, with Calm/Headspace serenity
 */

// =============================================================================
// COLORS - Soft, translucent, calming
// =============================================================================

export const COLORS = {
  // Primary - soft sky blue
  primary: {
    main: '#6B9FFF',
    light: '#A3C4FF',
    dark: '#4A7FE0',
    subtle: 'rgba(107, 159, 255, 0.15)',
  },

  // Background - gradient for depth
  background: {
    // Soft gradient stops (light mode)
    gradientStart: '#E8F4FF',    // Soft sky blue
    gradientMiddle: '#F0F4FF',   // Lavender mist
    gradientEnd: '#E0EAFF',      // Gentle periwinkle
    
    // Solid fallbacks
    primary: '#EDF3FF',
    secondary: '#F5F8FF',
  },

  // Glass effects - the magic ✨
  glass: {
    // Card backgrounds
    light: 'rgba(255, 255, 255, 0.55)',
    medium: 'rgba(255, 255, 255, 0.35)',
    subtle: 'rgba(255, 255, 255, 0.20)',
    
    // Borders for glass panels
    border: 'rgba(255, 255, 255, 0.60)',
    borderSubtle: 'rgba(255, 255, 255, 0.30)',
    
    // Overlays
    overlay: 'rgba(255, 255, 255, 0.85)',
    overlayDark: 'rgba(0, 0, 0, 0.25)',
  },

  // Text - soft, not harsh black
  text: {
    primary: '#1A2744',         // Deep blue-gray
    secondary: '#5A6B8A',       // Muted blue-gray
    muted: '#8B9BB8',           // Light blue-gray
    inverse: '#FFFFFF',
    onGlass: '#2A3A5A',         // For text on glass
  },

  // Semantic colors - soft versions
  accent: '#9D8FFF',            // Soft lavender for premium
  success: '#7DD3A8',           // Soft mint
  warning: '#FFD08A',           // Soft amber
  error: '#FF9B9B',             // Soft coral

  // Sound category tints (for glass cards)
  tint: {
    sleep: 'rgba(147, 170, 255, 0.25)',    // Soft indigo
    nature: 'rgba(134, 214, 172, 0.25)',   // Soft green
    focus: 'rgba(255, 198, 145, 0.25)',    // Soft amber
    ambient: 'rgba(192, 170, 255, 0.25)',  // Soft purple
  },

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

// =============================================================================
// GLASS STYLES - Reusable glass panel configurations
// =============================================================================

export const GLASS = {
  // Standard glass card (sound cards, feature cards)
  card: {
    backgroundColor: COLORS.glass.light,
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },

  // Subtle glass (now playing bar, modals)
  panel: {
    backgroundColor: COLORS.glass.medium,
    borderWidth: 1,
    borderColor: COLORS.glass.borderSubtle,
  },

  // Floating element (buttons, badges)
  floating: {
    backgroundColor: COLORS.glass.subtle,
    borderWidth: 0.5,
    borderColor: COLORS.glass.border,
  },

  // Blur intensities
  blur: {
    light: 20,
    medium: 40,
    heavy: 80,
    ultra: 100,
  },
} as const;

// =============================================================================
// SPACING
// =============================================================================

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 40,
  huge: 48,
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const TYPOGRAPHY = {
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  size: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 28,
    display: 34,
  },

  lineHeight: {
    tight: 1.1,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

// =============================================================================
// BORDERS & RADII - Generous, Apple-style
// =============================================================================

export const RADIUS = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
  round: 9999,
} as const;

// =============================================================================
// SHADOWS - Ultra soft, almost imperceptible
// =============================================================================

export const SHADOWS = {
  // Subtle lift
  xs: {
    shadowColor: '#4A6FA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  // Soft card shadow
  sm: {
    shadowColor: '#4A6FA5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  // Medium elevation
  md: {
    shadowColor: '#4A6FA5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },

  // Floating panels
  lg: {
    shadowColor: '#4A6FA5',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 6,
  },

  // Glass glow effect
  glow: {
    shadowColor: '#6B9FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

// =============================================================================
// ANIMATIONS
// =============================================================================

export const ANIMATION = {
  duration: {
    instant: 100,
    fast: 200,
    normal: 350,
    slow: 500,
    gentle: 700,
  },

  spring: {
    gentle: { damping: 20, stiffness: 120, mass: 1 },
    soft: { damping: 18, stiffness: 100, mass: 1 },
    bouncy: { damping: 12, stiffness: 150, mass: 0.8 },
  },
} as const;

// =============================================================================
// LAYOUT
// =============================================================================

export const LAYOUT = {
  // Glass card dimensions
  soundCard: {
    width: 150,
    height: 170,
  },

  // Now playing bar
  nowPlayingHeight: 76,
  nowPlayingBottomPadding: 34,

  // Icon sizes
  iconSize: {
    xs: 14,
    sm: 18,
    md: 22,
    lg: 26,
    xl: 32,
    xxl: 40,
    emoji: 52,
  },

  // Screen padding
  screenPadding: 20,
} as const;

// =============================================================================
// SOUND CARD TINTS - Soft color overlays for glass cards
// =============================================================================

export const SOUND_TINTS = {
  // Sleep - soft blues and indigos
  rain: { base: 'rgba(147, 170, 255, 0.30)', active: 'rgba(147, 170, 255, 0.50)' },
  thunder: { base: 'rgba(130, 150, 190, 0.30)', active: 'rgba(130, 150, 190, 0.50)' },
  ocean: { base: 'rgba(120, 190, 230, 0.30)', active: 'rgba(120, 190, 230, 0.50)' },
  fan: { base: 'rgba(170, 180, 200, 0.25)', active: 'rgba(170, 180, 200, 0.45)' },
  whitenoise: { base: 'rgba(180, 185, 195, 0.25)', active: 'rgba(180, 185, 195, 0.45)' },

  // Nature - soft greens and teals
  birds: { base: 'rgba(134, 214, 172, 0.30)', active: 'rgba(134, 214, 172, 0.50)' },
  forest: { base: 'rgba(120, 200, 150, 0.30)', active: 'rgba(120, 200, 150, 0.50)' },
  river: { base: 'rgba(130, 200, 220, 0.30)', active: 'rgba(130, 200, 220, 0.50)' },
  wind: { base: 'rgba(180, 210, 230, 0.25)', active: 'rgba(180, 210, 230, 0.45)' },
  campfire: { base: 'rgba(255, 180, 130, 0.30)', active: 'rgba(255, 180, 130, 0.50)' },

  // Focus - warm neutrals
  'coffee-shop': { base: 'rgba(200, 170, 140, 0.30)', active: 'rgba(200, 170, 140, 0.50)' },
  library: { base: 'rgba(190, 180, 160, 0.25)', active: 'rgba(190, 180, 160, 0.45)' },
  keyboard: { base: 'rgba(170, 175, 190, 0.25)', active: 'rgba(170, 175, 190, 0.45)' },
  office: { base: 'rgba(160, 185, 200, 0.25)', active: 'rgba(160, 185, 200, 0.45)' },

  // Ambient - soft purples and mystical
  chimes: { base: 'rgba(192, 170, 255, 0.30)', active: 'rgba(192, 170, 255, 0.50)' },
  'singing-bowl': { base: 'rgba(255, 210, 150, 0.30)', active: 'rgba(255, 210, 150, 0.50)' },
  space: { base: 'rgba(150, 160, 200, 0.30)', active: 'rgba(150, 160, 200, 0.50)' },
  underwater: { base: 'rgba(130, 190, 210, 0.30)', active: 'rgba(130, 190, 210, 0.50)' },
} as const;

// Type exports
export type SoundTintId = keyof typeof SOUND_TINTS;
