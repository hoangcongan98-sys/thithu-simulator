import { Play, Square } from 'lucide-react';

export default function ScoreCard({ score, timerDisplay, isExamRunning, onStartExam, onStopExam, status }) {
  const scoreColor = score >= 80 ? 'var(--accent-foreground)' : 'var(--destructive)';

  return (
    <div className="-mt-8 relative z-10">
      <div className="ds-card px-3 py-2.5" style={{ borderRadius: 18 }}>
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-stretch gap-2">
          {/* Score */}
          <div className="flex min-w-0 flex-col justify-center text-left">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Điểm số
            </div>
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[29px] font-black leading-none tabular-nums"
                style={{ color: scoreColor }}
              >
                {score}
              </span>
            </div>
            <div
              className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-extrabold leading-tight"
              style={{ background: 'var(--secondary)', color: 'var(--muted-foreground)' }}
            >
              {status}
            </div>
          </div>

          {/* Start/Stop button */}
          <div className="flex min-w-0 w-full flex-col gap-1 self-stretch">
            <button
              onClick={isExamRunning ? onStopExam : onStartExam}
              className="ds-btn flex h-full min-h-12 items-center justify-center gap-1.5 text-center leading-tight"
              style={{
                padding: '6px 7px',
                borderRadius: 11,
                fontSize: 13,
                fontWeight: 900,
                background: isExamRunning ? 'var(--destructive)' : 'var(--brand-grad)',
                color: '#fff',
                boxShadow: 'var(--shadow-pop)',
              }}
            >
              {isExamRunning ? (
                <>
                  <Square size={16} className="shrink-0 fill-current" />
                  <span>Dừng thi</span>
                </>
              ) : (
                <>
                  <Play size={16} className="shrink-0 fill-current" />
                  <span>Thi thật</span>
                </>
              )}
            </button>
          </div>

          {/* Timer */}
          <div className="flex shrink-0 flex-col justify-center text-right">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Thời gian
            </div>
            <div className="mt-0.5 text-[26px] font-black leading-none tabular-nums text-foreground">
              {timerDisplay}
            </div>
            <div className="mt-0.5 text-[9.5px] text-muted-foreground">
              Đạt từ 80 điểm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
