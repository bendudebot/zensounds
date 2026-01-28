/**
 * ZenSounds Theme Constants
 * 
 * Design Philosophy: Modern, calm, minimal
 * Inspired by Calm & Headspace but more minimal
 */

// =============================================================================
// COLORS
// =============================================================================

export const COLORS = {
  // Primary palette - soft, calming blues
  primary: {
    50: '#f0f7ff',
    100: '#e0efff',
    200: '#b8dbff',
    300: '#7ac0ff',
    400: '#3aa0ff',
    500: '#0a7cff',
    600: '#0062d6',
    main: '#5B7FFF',      // Primary accent
    light: '#8BA3FF',
    dark: '#3D5ACC',
  },

  // Secondary - soft sage/teal for nature elements
  secondary: {
    main: '#7BB5A3',
    light: '#A8D4C6',
    dark: '#5A9485',
  },

  // Background gradients - soft, ethereal
  background: {
    start: '#F8FAFF',     // Very soft blue-white
    middle: '#EEF4FF',    // Soft lavender hint
    end: '#E8F0FE',       // Gentle blue
    card: '#FFFFFF',
    overlay: 'rgba(255, 255, 255, 0.95)',
  },

  // Dark mode (for night use)
  backgroundDark: {
    start: '#1A1F35',
    middle: '#141929',
    end: '#0F1220',
    card: 'rgba(255, 255, 255, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.85)',
  },

  // Text colors
  text: {
    primary: '#1A2138',
    secondary: '#6B7394',
    muted: '#9CA3C2',
    inverse: '#FFFFFF',
  },

  // Semantic colors
  accent: '#8B7FF5',      // Soft purple for premium
  success: '#6BBF8A',
  warning: '#F5B97F',
  error: '#E57373',

  // Neutrals
  neutral: {
    50: '#FAFBFC',
    100: '#F4F6F9',
    200: '#E8ECF2',
    300: '#D1D8E4',
    400: '#A8B4C8',
    500: '#7A8AA5',
    600: '#5C6B82',
    700: '#3D4A5E',
    800: '#252F3E',
    900: '#131A26',
  },

  // Transparency utilities
  white: {
    10: 'rgba(255, 255, 255, 0.1)',
    20: 'rgba(255, 255, 255, 0.2)',
    50: 'rgba(255, 255, 255, 0.5)',
    80: 'rgba(255, 255, 255, 0.8)',
  },

  black: {
    5: 'rgba(0, 0, 0, 0.05)',
    10: 'rgba(0, 0, 0, 0.1)',
    20: 'rgba(0, 0, 0, 0.2)',
    50: 'rgba(0, 0, 0, 0.5)',
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
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const TYPOGRAPHY = {
  // Font weights
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Font sizes
  size: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 28,
    display: 32,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

// =============================================================================
// BORDERS & RADII
// =============================================================================

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 9999,
} as const;

// =============================================================================
// SHADOWS
// =============================================================================

export const SHADOWS = {
  sm: {
    shadowColor: '#1A2138',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#1A2138',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#1A2138',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    shadowColor: '#5B7FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

// =============================================================================
// ANIMATIONS
// =============================================================================

export const ANIMATION = {
  // Durations (ms)
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 800,
  },

  // Spring configs for reanimated
  spring: {
    gentle: { damping: 20, stiffness: 150 },
    bouncy: { damping: 12, stiffness: 180 },
    stiff: { damping: 25, stiffness: 300 },
  },
} as const;

// =============================================================================
// LAYOUT
// =============================================================================

export const LAYOUT = {
  // Card dimensions
  soundCard: {
    width: 140,
    height: 160,
  },

  // Header
  headerHeight: 60,

  // Now playing bar
  nowPlayingHeight: 80,
  nowPlayingBottomPadding: 34,

  // Max content widths
  maxContentWidth: 500,

  // Icon sizes
  iconSize: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 40,
    emoji: 48,
  },
} as const;

// =============================================================================
// SOUND CARD GRADIENTS - Soft, pastel versions
// =============================================================================

export const SOUND_GRADIENTS = {
  // Sleep - soft indigo/purple
  rain: {
    default: ['#B8C5FF', '#9AA8FF'] as [string, string],
    active: ['#8BA3FF', '#6B8AFF'] as [string, string],
  },
  thunder: {
    default: ['#B0BAC9', '#8E9AAD'] as [string, string],
    active: ['#8E9AAD', '#6E7A8D'] as [string, string],
  },
  ocean: {
    default: ['#9DD1F5', '#7BBFEF'] as [string, string],
    active: ['#7BBFEF', '#5AADE9'] as [string, string],
  },
  fan: {
    default: ['#C5CAD4', '#A8AEB8'] as [string, string],
    active: ['#A8AEB8', '#8B919B'] as [string, string],
  },
  whitenoise: {
    default: ['#D4D8E0', '#B8BCC4'] as [string, string],
    active: ['#B8BCC4', '#9CA0A8'] as [string, string],
  },

  // Nature - soft greens and blues
  birds: {
    default: ['#A8E0C4', '#8AD4B0'] as [string, string],
    active: ['#8AD4B0', '#6CC89C'] as [string, string],
  },
  forest: {
    default: ['#9BD4B0', '#7CC898'] as [string, string],
    active: ['#7CC898', '#5EBC80'] as [string, string],
  },
  river: {
    default: ['#A0D9EF', '#82CDE9'] as [string, string],
    active: ['#82CDE9', '#64C1E3'] as [string, string],
  },
  wind: {
    default: ['#D0E8F0', '#B4DCE8'] as [string, string],
    active: ['#B4DCE8', '#98D0E0'] as [string, string],
  },
  campfire: {
    default: ['#FFD4A8', '#FFC488'] as [string, string],
    active: ['#FFC488', '#FFB468'] as [string, string],
  },

  // Focus - warm neutrals
  'coffee-shop': {
    default: ['#D4C4B0', '#C4B4A0'] as [string, string],
    active: ['#C4B4A0', '#B4A490'] as [string, string],
  },
  library: {
    default: ['#D8D0C4', '#C8C0B4'] as [string, string],
    active: ['#C8C0B4', '#B8B0A4'] as [string, string],
  },
  keyboard: {
    default: ['#C4C8D0', '#B4B8C0'] as [string, string],
    active: ['#B4B8C0', '#A4A8B0'] as [string, string],
  },
  office: {
    default: ['#C0D0DC', '#A8C0CC'] as [string, string],
    active: ['#A8C0CC', '#90B0BC'] as [string, string],
  },

  // Ambient - soft purples and mystical
  chimes: {
    default: ['#D4C8F0', '#C4B8E8'] as [string, string],
    active: ['#C4B8E8', '#B4A8E0'] as [string, string],
  },
  'singing-bowl': {
    default: ['#F0E4C0', '#E8DCA8'] as [string, string],
    active: ['#E8DCA8', '#E0D490'] as [string, string],
  },
  space: {
    default: ['#B8C0D8', '#A0A8C8'] as [string, string],
    active: ['#A0A8C8', '#8890B8'] as [string, string],
  },
  underwater: {
    default: ['#9CC8E0', '#84BCD8'] as [string, string],
    active: ['#84BCD8', '#6CB0D0'] as [string, string],
  },
} as const;

// Type exports
export type ColorKey = keyof typeof COLORS;
export type SpacingKey = keyof typeof SPACING;
