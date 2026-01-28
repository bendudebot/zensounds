import { SOUND_GRADIENTS } from './theme';

// =============================================================================
// TYPES
// =============================================================================

export interface Sound {
  id: SoundId;
  name: string;
  icon: string;
  category: CategoryId;
  premium: boolean;
  gradient: readonly [string, string];
  activeGradient: readonly [string, string];
  url: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
}

// Type-safe IDs
export type CategoryId = 'sleep' | 'nature' | 'focus' | 'ambient';

export type SoundId =
  | 'rain' | 'thunder' | 'ocean' | 'fan' | 'whitenoise'
  | 'birds' | 'forest' | 'river' | 'wind' | 'campfire'
  | 'coffee-shop' | 'library' | 'keyboard' | 'office'
  | 'chimes' | 'singing-bowl' | 'space' | 'underwater';

// =============================================================================
// CATEGORIES
// =============================================================================

export const CATEGORIES: readonly Category[] = [
  { id: 'sleep', name: 'Sleep', icon: '🌙' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
  { id: 'focus', name: 'Focus', icon: '🎯' },
  { id: 'ambient', name: 'Ambient', icon: '✨' },
] as const;

// =============================================================================
// SOUND DATA
// =============================================================================

// Base URL for sound files (replace with actual CDN in production)
const SOUND_BASE_URL = 'https://cdn.freesound.org/previews';
const PLACEHOLDER_URL = `${SOUND_BASE_URL}/placeholder.mp3`;

// Helper to create sound object with less repetition
const createSound = (
  id: SoundId,
  name: string,
  icon: string,
  category: CategoryId,
  premium: boolean,
  url: string = PLACEHOLDER_URL
): Sound => ({
  id,
  name,
  icon,
  category,
  premium,
  gradient: SOUND_GRADIENTS[id]?.default ?? ['#E0E5F0', '#D0D5E0'],
  activeGradient: SOUND_GRADIENTS[id]?.active ?? ['#D0D5E0', '#C0C5D0'],
  url,
});

export const SOUNDS: readonly Sound[] = [
  // Sleep sounds (mostly free)
  createSound('rain', 'Rain', '🌧️', 'sleep', false),
  createSound('thunder', 'Thunder', '⛈️', 'sleep', false),
  createSound('ocean', 'Ocean Waves', '🌊', 'sleep', false),
  createSound('fan', 'Fan', '🌀', 'sleep', false),
  createSound('whitenoise', 'White Noise', '📻', 'sleep', false),

  // Nature sounds
  createSound('birds', 'Birds', '🐦', 'nature', false),
  createSound('forest', 'Forest', '🌲', 'nature', false),
  createSound('river', 'River', '🏞️', 'nature', true),
  createSound('wind', 'Wind', '💨', 'nature', true),
  createSound('campfire', 'Campfire', '🔥', 'nature', true),

  // Focus sounds
  createSound('coffee-shop', 'Coffee Shop', '☕', 'focus', false),
  createSound('library', 'Library', '📚', 'focus', false),
  createSound('keyboard', 'Typing', '⌨️', 'focus', true),
  createSound('office', 'Office', '🏢', 'focus', true),

  // Ambient sounds
  createSound('chimes', 'Wind Chimes', '🎐', 'ambient', true),
  createSound('singing-bowl', 'Singing Bowl', '🔔', 'ambient', true),
  createSound('space', 'Space', '🌌', 'ambient', true),
  createSound('underwater', 'Underwater', '🐠', 'ambient', true),
] as const;

// =============================================================================
// COMPUTED VALUES
// =============================================================================

export const FREE_SOUNDS_COUNT = SOUNDS.filter(s => !s.premium).length;
export const PREMIUM_SOUNDS_COUNT = SOUNDS.filter(s => s.premium).length;
export const TOTAL_SOUNDS_COUNT = SOUNDS.length;

// Helper to get sounds by category
export const getSoundsByCategory = (categoryId: CategoryId): Sound[] =>
  SOUNDS.filter(s => s.category === categoryId);

// Helper to get a sound by ID
export const getSoundById = (id: SoundId): Sound | undefined =>
  SOUNDS.find(s => s.id === id);
