import { SOUND_TINTS, SoundTintId } from './theme';

// =============================================================================
// TYPES
// =============================================================================

export interface Sound {
  id: SoundId;
  name: string;
  icon: string;
  category: CategoryId;
  premium: boolean;
  tint: { base: string; active: string };
  url: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  description: string;
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
  { id: 'sleep', name: 'Sleep', icon: '🌙', description: 'Drift off peacefully' },
  { id: 'nature', name: 'Nature', icon: '🌿', description: 'Sounds of the earth' },
  { id: 'focus', name: 'Focus', icon: '✨', description: 'Enhance concentration' },
  { id: 'ambient', name: 'Ambient', icon: '🔮', description: 'Ethereal soundscapes' },
] as const;

// =============================================================================
// SOUND DATA
// =============================================================================

// Base URL for sound files
const SOUND_BASE_URL = 'https://cdn.freesound.org/previews';
const PLACEHOLDER_URL = `${SOUND_BASE_URL}/placeholder.mp3`;

// Default tint for missing sounds
const DEFAULT_TINT = { base: 'rgba(180, 190, 210, 0.25)', active: 'rgba(180, 190, 210, 0.45)' };

// Helper to create sound object
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
  tint: SOUND_TINTS[id as SoundTintId] ?? DEFAULT_TINT,
  url,
});

export const SOUNDS: readonly Sound[] = [
  // Sleep sounds
  createSound('rain', 'Rain', '🌧️', 'sleep', false),
  createSound('thunder', 'Thunder', '⛈️', 'sleep', false),
  createSound('ocean', 'Ocean Waves', '🌊', 'sleep', false),
  createSound('fan', 'Fan', '🌀', 'sleep', false),
  createSound('whitenoise', 'White Noise', '📻', 'sleep', false),

  // Nature sounds
  createSound('birds', 'Birds', '🐦', 'nature', false),
  createSound('forest', 'Forest', '🌲', 'nature', false),
  createSound('river', 'River', '💧', 'nature', true),
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
// HELPERS
// =============================================================================

export const FREE_SOUNDS_COUNT = SOUNDS.filter(s => !s.premium).length;
export const PREMIUM_SOUNDS_COUNT = SOUNDS.filter(s => s.premium).length;
export const TOTAL_SOUNDS_COUNT = SOUNDS.length;

export const getSoundsByCategory = (categoryId: CategoryId): Sound[] =>
  SOUNDS.filter(s => s.category === categoryId);

export const getSoundById = (id: SoundId): Sound | undefined =>
  SOUNDS.find(s => s.id === id);

export const getCategoryById = (id: CategoryId): Category | undefined =>
  CATEGORIES.find(c => c.id === id);
