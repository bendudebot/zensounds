import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio, AVPlaybackSource } from 'expo-av';
import { SOUNDS } from '../constants/sounds';

interface SoundInstance {
  id: string;
  sound: Audio.Sound;
}

interface SoundStore {
  // State
  playingIds: string[];
  volumes: Record<string, number>;
  isPremium: boolean;
  timerMinutes: number;
  timerRemaining: number | null;
  soundInstances: SoundInstance[];
  
  // Actions
  initialize: () => Promise<void>;
  toggleSound: (id: string) => Promise<void>;
  setVolume: (id: string, volume: number) => Promise<void>;
  stopAll: () => Promise<void>;
  setTimer: (minutes: number) => void;
  setPremium: (value: boolean) => void;
}

export const useSoundStore = create<SoundStore>()(
  persist(
    (set, get) => ({
      // Initial state
      playingIds: [],
      volumes: {},
      isPremium: false,
      timerMinutes: 0,
      timerRemaining: null,
      soundInstances: [],

      // Initialize audio
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

      // Toggle sound on/off
      toggleSound: async (id: string) => {
        const { playingIds, volumes, soundInstances } = get();
        
        if (playingIds.includes(id)) {
          // Stop this sound
          const instance = soundInstances.find(s => s.id === id);
          if (instance) {
            await instance.sound.stopAsync();
            await instance.sound.unloadAsync();
          }
          
          set({
            playingIds: playingIds.filter(pid => pid !== id),
            soundInstances: soundInstances.filter(s => s.id !== id),
          });
        } else {
          // Start this sound
          const soundConfig = SOUNDS.find(s => s.id === id);
          if (!soundConfig) return;
          
          try {
            const { sound } = await Audio.Sound.createAsync(
              { uri: soundConfig.url },
              {
                isLooping: true,
                volume: volumes[id] ?? 0.7,
              }
            );
            
            await sound.playAsync();
            
            set({
              playingIds: [...playingIds, id],
              soundInstances: [...soundInstances, { id, sound }],
            });
          } catch (error) {
            console.error('Failed to play sound:', error);
          }
        }
      },

      // Set volume for a sound
      setVolume: async (id: string, volume: number) => {
        const { soundInstances, volumes } = get();
        const instance = soundInstances.find(s => s.id === id);
        
        if (instance) {
          await instance.sound.setVolumeAsync(volume);
        }
        
        set({
          volumes: { ...volumes, [id]: volume },
        });
      },

      // Stop all sounds
      stopAll: async () => {
        const { soundInstances } = get();
        
        for (const instance of soundInstances) {
          try {
            await instance.sound.stopAsync();
            await instance.sound.unloadAsync();
          } catch (error) {
            console.error('Failed to stop sound:', error);
          }
        }
        
        set({
          playingIds: [],
          soundInstances: [],
          timerMinutes: 0,
          timerRemaining: null,
        });
      },

      // Set sleep timer
      setTimer: (minutes: number) => {
        set({
          timerMinutes: minutes,
          timerRemaining: minutes > 0 ? minutes * 60 : null,
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
          }, 1000);
        }
      },

      // Set premium status
      setPremium: (value: boolean) => {
        set({ isPremium: value });
      },
    }),
    {
      name: 'zensounds-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        volumes: state.volumes,
        isPremium: state.isPremium,
      }),
    }
  )
);
