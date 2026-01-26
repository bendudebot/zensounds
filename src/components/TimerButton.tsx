import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useSoundStore } from '../stores/soundStore';

const TIMER_OPTIONS = [
  { label: '15 min', minutes: 15 },
  { label: '30 min', minutes: 30 },
  { label: '45 min', minutes: 45 },
  { label: '1 hour', minutes: 60 },
  { label: '2 hours', minutes: 120 },
  { label: 'Off', minutes: 0 },
];

export function TimerButton() {
  const [showModal, setShowModal] = useState(false);
  const { timerMinutes, setTimer, timerRemaining } = useSoundStore();

  const handleSelectTimer = (minutes: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimer(minutes);
    setShowModal(false);
  };

  const formatRemaining = () => {
    if (!timerRemaining) return null;
    const mins = Math.floor(timerRemaining / 60);
    const secs = timerRemaining % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Pressable 
        style={[styles.button, timerMinutes > 0 && styles.buttonActive]}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.icon}>⏰</Text>
        {timerRemaining && (
          <Text style={styles.timerText}>{formatRemaining()}</Text>
        )}
      </Pressable>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sleep Timer</Text>
            <Text style={styles.modalSubtitle}>
              Sounds will stop after the selected time
            </Text>
            
            <View style={styles.optionsGrid}>
              {TIMER_OPTIONS.map((option) => (
                <Pressable
                  key={option.minutes}
                  style={[
                    styles.optionButton,
                    timerMinutes === option.minutes && styles.optionActive,
                  ]}
                  onPress={() => handleSelectTimer(option.minutes)}
                >
                  <Text style={[
                    styles.optionText,
                    timerMinutes === option.minutes && styles.optionTextActive,
                  ]}>
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  buttonActive: {
    backgroundColor: 'rgba(233, 69, 96, 0.3)',
  },
  icon: {
    fontSize: 16,
  },
  timerText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
    marginBottom: 24,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    minWidth: 90,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: '#e94560',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#ffffff',
  },
});
