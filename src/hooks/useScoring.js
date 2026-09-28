import { useState, useCallback } from 'react';

const INITIAL_SCORE = 100;
const PASS_THRESHOLD = 80;

export function useScoring() {
  const [score, setScore] = useState(INITIAL_SCORE);
  const [penalties, setPenalties] = useState([]); // { label, points, timestamp }
  const [isEliminated, setIsEliminated] = useState(false);

  const applyPenalty = useCallback((error) => {
    if (isEliminated) return;

    const penalty = {
      label: error.label,
      points: error.points,
      isElimination: error.isElimination,
      timestamp: new Date().toLocaleTimeString('vi-VN'),
    };

    setPenalties(prev => [...prev, penalty]);

    if (error.isElimination) {
      setScore(0);
      setIsEliminated(true);
    } else {
      setScore(prev => Math.max(0, prev + error.points));
    }
  }, [isEliminated]);

  const reset = useCallback(() => {
    setScore(INITIAL_SCORE);
    setPenalties([]);
    setIsEliminated(false);
  }, []);

  const isPassed = score >= PASS_THRESHOLD && !isEliminated;

  return {
    score,
    penalties,
    isEliminated,
    isPassed,
    passThreshold: PASS_THRESHOLD,
    applyPenalty,
    reset,
  };
}
