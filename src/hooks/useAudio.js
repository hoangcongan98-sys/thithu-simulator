import { useCallback, useEffect } from 'react';
import {
  playTingTong,
  playTun,
  playErrorSound,
  playSuccessSound,
  playFailSound,
  speak,
} from '../utils/audio';

export function useAudio() {
  // Pre-load voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      // Some browsers need this event to load voices
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const playCommand = useCallback(async (commandText) => {
    playTingTong();
    // Wait for ting tong to finish, then speak
    await new Promise(r => setTimeout(r, 800));
    await speak(commandText);
  }, []);

  const playErrorAlert = useCallback(async (errorLabel) => {
    playErrorSound();
    await new Promise(r => setTimeout(r, 400));
    await speak(errorLabel, 1.1);
  }, []);

  const playResultSound = useCallback(async (type) => {
    if (type === 'pass') {
      playSuccessSound();
      await new Promise(r => setTimeout(r, 500));
      await speak('Thí sinh đậu. Kết quả đạt yêu cầu.');
    } else if (type === 'fail') {
      playFailSound();
      await new Promise(r => setTimeout(r, 500));
      await speak('Thí sinh trượt. Kết quả không đạt yêu cầu.');
    } else if (type === 'revoke') {
      playFailSound();
      await new Promise(r => setTimeout(r, 500));
      await speak('Tước quyền thi. Thí sinh vi phạm nghiêm trọng.');
    }
  }, []);

  return {
    playTingTong,
    playTun,
    playCommand,
    playErrorAlert,
    playResultSound,
    speak,
  };
}
