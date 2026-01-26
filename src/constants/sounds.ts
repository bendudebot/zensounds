export interface Sound {
  id: string;
  name: string;
  icon: string;
  category: string;
  premium: boolean;
  gradient: [string, string];
  activeGradient: [string, string];
  // URL to sound file - use freesound.org or similar royalty-free sources
  url: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: 'sleep', name: 'Sleep', icon: '🌙' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
  { id: 'focus', name: 'Focus', icon: '🎯' },
  { id: 'ambient', name: 'Ambient', icon: '🎶' },
];

// Note: In production, these would be actual audio files
// For now, using placeholder require statements
// You'll need to add actual .mp3/.wav files to assets/sounds/

export const SOUNDS: Sound[] = [
  // Sleep sounds (Free)
  {
    id: 'rain',
    name: 'Rain',
    icon: '🌧️',
    category: 'sleep',
    premium: false,
    gradient: ['#667eea', '#764ba2'],
    activeGradient: ['#764ba2', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'thunder',
    name: 'Thunder',
    icon: '⛈️',
    category: 'sleep',
    premium: false,
    gradient: ['#4a5568', '#2d3748'],
    activeGradient: ['#2d3748', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    icon: '🌊',
    category: 'sleep',
    premium: false,
    gradient: ['#0077b6', '#023e8a'],
    activeGradient: ['#023e8a', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'fan',
    name: 'Fan',
    icon: '🌀',
    category: 'sleep',
    premium: false,
    gradient: ['#6c757d', '#495057'],
    activeGradient: ['#495057', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'whitenoise',
    name: 'White Noise',
    icon: '📺',
    category: 'sleep',
    premium: false,
    gradient: ['#718096', '#4a5568'],
    activeGradient: ['#4a5568', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  
  // Nature sounds
  {
    id: 'birds',
    name: 'Birds',
    icon: '🐦',
    category: 'nature',
    premium: false,
    gradient: ['#38a169', '#276749'],
    activeGradient: ['#276749', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    category: 'nature',
    premium: false,
    gradient: ['#2d5a27', '#1a3c18'],
    activeGradient: ['#1a3c18', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'river',
    name: 'River',
    icon: '🏞️',
    category: 'nature',
    premium: true,
    gradient: ['#2193b0', '#6dd5ed'],
    activeGradient: ['#6dd5ed', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'wind',
    name: 'Wind',
    icon: '💨',
    category: 'nature',
    premium: true,
    gradient: ['#bdc3c7', '#95a5a6'],
    activeGradient: ['#95a5a6', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'campfire',
    name: 'Campfire',
    icon: '🔥',
    category: 'nature',
    premium: true,
    gradient: ['#f39c12', '#e74c3c'],
    activeGradient: ['#e74c3c', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  
  // Focus sounds
  {
    id: 'coffee-shop',
    name: 'Coffee Shop',
    icon: '☕',
    category: 'focus',
    premium: false,
    gradient: ['#8b4513', '#5d3a1a'],
    activeGradient: ['#5d3a1a', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'library',
    name: 'Library',
    icon: '📚',
    category: 'focus',
    premium: false,
    gradient: ['#8b7355', '#6b5344'],
    activeGradient: ['#6b5344', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'keyboard',
    name: 'Typing',
    icon: '⌨️',
    category: 'focus',
    premium: true,
    gradient: ['#3d3d3d', '#2d2d2d'],
    activeGradient: ['#2d2d2d', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'office',
    name: 'Office',
    icon: '🏢',
    category: 'focus',
    premium: true,
    gradient: ['#607d8b', '#455a64'],
    activeGradient: ['#455a64', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  
  // Ambient sounds
  {
    id: 'chimes',
    name: 'Wind Chimes',
    icon: '🎐',
    category: 'ambient',
    premium: true,
    gradient: ['#9b59b6', '#8e44ad'],
    activeGradient: ['#8e44ad', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'singing-bowl',
    name: 'Singing Bowl',
    icon: '🔔',
    category: 'ambient',
    premium: true,
    gradient: ['#f1c40f', '#f39c12'],
    activeGradient: ['#f39c12', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'space',
    name: 'Space',
    icon: '🚀',
    category: 'ambient',
    premium: true,
    gradient: ['#0c0c1e', '#1a1a3e'],
    activeGradient: ['#1a1a3e', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
  {
    id: 'underwater',
    name: 'Underwater',
    icon: '🐠',
    category: 'ambient',
    premium: true,
    gradient: ['#006994', '#004466'],
    activeGradient: ['#004466', '#e94560'],
    url: 'https://cdn.freesound.org/previews/placeholder.mp3', // TODO: Replace with real sound URL
  },
];

// Count free vs premium
export const FREE_SOUNDS_COUNT = SOUNDS.filter(s => !s.premium).length;
export const PREMIUM_SOUNDS_COUNT = SOUNDS.filter(s => s.premium).length;
