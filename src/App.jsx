import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import ScoreCard from './components/ScoreCard';
import ModeToggle from './components/ModeToggle';
import ExerciseGrid from './components/ExerciseGrid';
import ErrorPanel from './components/ErrorPanel';
import ResultButtons from './components/ResultButtons';
import BottomBar from './components/BottomBar';
import ScoreBoard from './components/ScoreBoard';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';

import { saHinhExercises } from './data/saHinhExercises';
import { duongTruongExercise } from './data/duongTruongExercises';

import { useExamTimer } from './hooks/useExamTimer';
import { useScoring } from './hooks/useScoring';
import { useAudio } from './hooks/useAudio';

export default function App() {
  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('thithu-dark');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('thithu-dark', String(darkMode));
  }, [darkMode]);

  // Mode: 'sahinh' or 'duongtruong'
  const [mode, setMode] = useState('sahinh');

  // Selected exercise
  const [selectedExerciseId, setSelectedExerciseId] = useState(1);

  // Exam state
  const [isExamRunning, setIsExamRunning] = useState(false);

  // Hooks
  const timer = useExamTimer(1080); // 18 minutes
  const scoring = useScoring();
  const audio = useAudio();

  // ScoreBoard modal
  const [showScoreBoard, setShowScoreBoard] = useState(false);

  // Get current exercises and errors based on mode
  const currentExercises = mode === 'sahinh' ? saHinhExercises : [duongTruongExercise];
  const selectedExercise =
    mode === 'sahinh'
      ? saHinhExercises.find((ex) => ex.id === selectedExerciseId) || saHinhExercises[0]
      : duongTruongExercise;
  const currentErrors = selectedExercise?.errors || [];

  // Status text
  const getStatus = () => {
    if (scoring.isEliminated) return 'Bị loại';
    if (isExamRunning) return 'Đang thi';
    if (timer.elapsed > 0 && !timer.isRunning) return 'Đã dừng';
    return 'Sẵn sàng';
  };

  // Handle mode change
  const handleChangeMode = useCallback(
    (newMode) => {
      setMode(newMode);
      if (newMode === 'sahinh') {
        setSelectedExerciseId(1);
      } else {
        setSelectedExerciseId('dt');
      }
    },
    []
  );

  // Handle exercise select
  const handleSelectExercise = useCallback(
    (id) => {
      setSelectedExerciseId(id);
      // If exam is running, automatically play the command
      if (isExamRunning) {
        const exercise = saHinhExercises.find((ex) => ex.id === id);
        if (exercise) {
          audio.playCommand(exercise.command);
        }
      }
    },
    [isExamRunning, audio]
  );

  // Start exam
  const handleStartExam = useCallback(() => {
    scoring.reset();
    timer.reset();
    setIsExamRunning(true);
    timer.start();

    // Play start command
    const exercise = mode === 'sahinh'
      ? saHinhExercises.find((ex) => ex.id === selectedExerciseId) || saHinhExercises[0]
      : duongTruongExercise;
    audio.playCommand(exercise.command);
  }, [scoring, timer, mode, selectedExerciseId, audio]);

  // Stop exam
  const handleStopExam = useCallback(() => {
    timer.stop();
    setIsExamRunning(false);
  }, [timer]);

  // Auto-stop when time is up
  useEffect(() => {
    if (timer.isTimeUp && isExamRunning) {
      setIsExamRunning(false);
      audio.speak('Hết thời gian. Bài thi kết thúc.');
    }
  }, [timer.isTimeUp, isExamRunning, audio]);

  // Handle error click
  const handleErrorClick = useCallback(
    (error) => {
      // Play error sound
      audio.playErrorAlert(error.label);

      // Apply penalty if exam is running
      if (isExamRunning) {
        scoring.applyPenalty(error);
      }
    },
    [isExamRunning, scoring, audio]
  );

  // Handle result buttons
  const handleResult = useCallback(
    (type) => {
      audio.playResultSound(type);
      if (isExamRunning) {
        handleStopExam();
      }
    },
    [audio, isExamRunning, handleStopExam]
  );

  // Handle bottom bar buttons
  const handleTingTong = useCallback(() => {
    audio.playTingTong();
  }, [audio]);

  const handlePlayCommand = useCallback(() => {
    audio.playCommand(selectedExercise.command);
  }, [audio, selectedExercise]);

  const handleTun = useCallback(() => {
    audio.playTun();
  }, [audio]);

  return (
    <div className="min-h-screen relative flex w-full flex-col items-center bg-gradient-premium overflow-x-clip">
      <div className="app-body-surface relative z-10 flex w-full max-w-[430px] flex-col overflow-x-clip sm:border-white/20 sm:my-4 sm:rounded-[2.5rem] sm:border min-h-screen sm:overflow-clip">
        {/* Header */}
        <Header darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />

        {/* Intro */}
        <section className="px-6 pt-4 pb-1">
          <h1 className="text-center text-[20px] font-extrabold leading-[26px] tracking-tight text-foreground">
            Thiết bị giả lập thi sát hạch
          </h1>
          <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground text-center">
            Có thể xoay ngang điện thoại để sử dụng
          </p>
        </section>

        {/* Main content */}
        <main className="max-w-[480px] mx-auto px-6 pb-36">
          {/* Score Card */}
          <ScoreCard
            score={scoring.score}
            timerDisplay={timer.display}
            isExamRunning={isExamRunning}
            onStartExam={handleStartExam}
            onStopExam={handleStopExam}
            status={getStatus()}
          />

          {/* Mode Toggle */}
          <ModeToggle mode={mode} onChangeMode={handleChangeMode} />

          {/* Exercise Grid (only for sa hình) */}
          {mode === 'sahinh' && (
            <ExerciseGrid
              exercises={currentExercises}
              selectedId={selectedExerciseId}
              onSelect={handleSelectExercise}
            />
          )}

          {/* Đường trường title */}
          {mode === 'duongtruong' && (
            <section className="mt-2">
              <h2 className="mb-2 text-[16px] font-black text-foreground">
                Bài thi đường trường
              </h2>
            </section>
          )}

          {/* Error Panel */}
          <ErrorPanel
            errors={currentErrors}
            onErrorClick={handleErrorClick}
            onShowScoreBoard={() => setShowScoreBoard(true)}
            isExamRunning={isExamRunning}
          />

          {/* Result Buttons */}
          <ResultButtons onResult={handleResult} />

          {/* Info Section */}
          <InfoSection />

          {/* Footer */}
          <Footer />
        </main>

        {/* Bottom Bar */}
        <BottomBar
          onTingTong={handleTingTong}
          onPlayCommand={handlePlayCommand}
          onTun={handleTun}
        />

        {/* ScoreBoard Modal */}
        <ScoreBoard
          penalties={scoring.penalties}
          score={scoring.score}
          isOpen={showScoreBoard}
          onClose={() => setShowScoreBoard(false)}
        />
      </div>
    </div>
  );
}
