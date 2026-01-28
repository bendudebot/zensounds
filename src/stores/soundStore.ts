import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

import { SOUNDS, SoundId, getSoundById } from '../constants/sounds';

// =============================================================================
// TYPES
// =============================================================================

interface SoundInstance {
  id: SoundId;
  sound: Audio.Sound;
}

interface SoundStoreState {
  // Playback state
  playingIds: SoundId[];
  soundInstances: SoundInstance[];
  volumes: Record<SoundId, number>;
  
  // Timer state
  timerMinutes: number;
  timerRemaining: number | null;
  
  // User state
  isPremium: boolean;
}

interface SoundStoreActions {
  initialize: () => Promise<void>;
  toggleSound: (id: SoundId) => Promise<void>;
  setVolume: (id: SoundId, volume: number) => Promise<void>;
  stopAll: () => Promise<void>;
  setTimer: (minutes: number) => void;
  setPremium: (value: boolean) => void;
}

type SoundStore = SoundStoreState & SoundStoreActions;

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_VOLUME = 0.7;
const SECONDS_PER_MINUTE = 60;
const TIMER_INTERVAL_MS = 1000;
const STORAGE_KEY = 'zensounds-storage';

// =============================================================================
// STORE
// =============================================================================

export const useSoundStore = create<SoundStore>()(
  persist(
    (set, get) => ({
      // Initial state
      playingIds: [],
      soundInstances: [],
      volumes: {} as Record<SoundId, number>,
      timerMinutes: 0,
      timerRemaining: null,
      isPremium: false,

      /**
       * Initialize audio system
       */
      initialize: async () => {
        try {
          await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            shouldDuckAndroid: true,
          });
        } catch (error) {
          console.error('Failed to initialize audio:', error);
        }
      },

      /**
       * Toggle a sound on/off
       */
      toggleSound: async (id: SoundId) => {
        const { playingIds, volumes, soundInstances } = get();
        const isPlaying = playingIds.includes(id);
        
        if (isPlaying) {
          // Stop this sound
          const instance = soundInstances.find(s => s.id === id);
          if (instance) {
            try {
              await instance.sound.stopAsync();
              await instance.sound.unloadAsync();
            } catch (error) {
              console.error(`Failed to stop sound ${id}:`, error);
            }
          }
          
          set({
            playingIds: playingIds.filter(pid => pid !== id),
            soundInstances: soundInstances.filter(s => s.id !== id),
          });
        } else {
          // Start this sound
          const soundConfig = getSoundById(id);
          if (!soundConfig) {
            console.warn(`Sound not found: ${id}`);
            return;
          }
          
          try {
            const { sound } = await Audio.Sound.createAsync(
              { uri: soundConfig.url },
              {
                isLooping: true,
                volume: volumes[id] ?? DEFAULT_VOLUME,
              }
            );
            
            await sound.playAsync();
            
            set({
              playingIds: [...playingIds, id],
              soundInstances: [...soundInstances, { id, sound }],
            });
          } catch (error) {
            console.error(`Failed to play sound ${id}:`, error);
          }
        }
      },

      /**
       * Set volume for a specific sound
       */
      setVolume: async (id: SoundId, volume: number) => {
        const { soundInstances, volumes } = get();
        const normalizedVolume = Math.max(0, Math.min(1, volume));
        
        const instance = soundInstances.find(s => s.id === id);
        if (instance) {
          try {
            await instance.sound.setVolumeAsync(normalizedVolume);
          } catch (error) {
            console.error(`Failed to set volume for ${id}:`, error);
          }
        }
        
        set({
          volumes: { ...volumes, [id]: normalizedVolume },
        });
      },

      /**
       * Stop all playing sounds
       */
      stopAll: async () => {
        const { soundInstances } = get();
        
        // Stop all sounds in parallel
        await Promise.all(
          soundInstances.map(async (instance) => {
            try {
              await instance.sound.stopAsync();
              await instance.sound.unloadAsync();
            } catch (error) {
              console.error(`Failed to stop sound ${instance.id}:`, error);
            }
          })
        );
        
        set({
          playingIds: [],
          soundInstances: [],
          timerMinutes: 0,
          timerRemaining: null,
        });
      },

      /**
       * Set sleep timer
       */
      setTimer: (minutes: number) => {
        const timerSeconds = minutes > 0 ? minutes * SECONDS_PER_MINUTE : null;
        
        set({
          timerMinutes: minutes,
          timerRemaining: timerSeconds,
        });
        
        if (minutes > 0) {
          // Start countdown
          const interval = setInterval(() => {
            const { timerRemaining, stopAll } = get();
            
            if (timerRemaining === null || timerRemaining <= 0) {
              clearInterval(interval);
              stopAll();
              return;
            }
            
            set({ timerRemaining: timerRemaining - 1 });
          }, TIMER_INTERVAL_MS);
        }
      },

      /**
       * Set premium status
       */
      setPremium: (value: boolean) => {
        set({ isPremium: value });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist these fields
      partialize: (state) => ({
        volumes: state.volumes,
        isPremium: state.isPremium,
      }),
    }
  )
);

// =============================================================================
// SELECTORS (for optimized re-renders)
// =============================================================================

export const selectPlayingIds = (state: SoundStore) => state.playingIds;
export const selectIsPremium = (state: SoundStore) => state.isPremium;
export const selectTimerRemaining = (state: SoundStore) => state.timerRemaining;
export const selectIsPlaying = (state: SoundStore) => state.playingIds.length > 0;
