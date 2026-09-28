import { useState, useRef, useCallback, useEffect } from 'react';

export function useExamTimer(totalSeconds = 1080) {
  // totalSeconds defaults to 18 minutes (1080s) for sa hình
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const remaining = Math.max(0, totalSeconds - elapsed);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeUp = elapsed >= totalSeconds;

  const start = useCallback(() => {
    if (intervalRef.current) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setElapsed(prev => {
        if (prev + 1 >= totalSeconds) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return totalSeconds;
        }
        return prev + 1;
      });
    }, 1000);
  }, [totalSeconds]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setElapsed(0);
  }, [stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    elapsed,
    remaining,
    display,
    isRunning,
    isTimeUp,
    start,
    stop,
    reset,
  };
}
