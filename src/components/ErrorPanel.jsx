import { Table } from 'lucide-react';

export default function ErrorPanel({ errors, onErrorClick, onShowScoreBoard, isExamRunning }) {
  return (
    <div>
      <div className="mt-2 grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <h3 className="text-[15px] font-extrabold text-foreground">Lỗi bài thi</h3>
        <span className="text-center text-[11.5px] font-semibold text-muted-foreground">
          Phát âm thanh tự do
        </span>
        <button
          onClick={onShowScoreBoard}
          className="ds-btn ds-btn-soft flex items-center justify-center gap-1.5"
          style={{ padding: '7px 10px', borderRadius: 11, fontSize: '11.5px', fontWeight: 800 }}
        >
          <Table size={14} className="shrink-0" />
          Bảng điểm
        </button>
      </div>
      <div className="mt-1.5 grid gap-1">
        {errors.map((error, idx) => (
          <button
            key={idx}
            onClick={() => onErrorClick(error)}
            className="ds-card relative flex items-center justify-center text-center text-[11.5px] font-bold leading-tight transition-all active:scale-[0.98]"
            style={{
              padding: '5px 5px',
              borderRadius: 10,
              minHeight: 38,
              color: 'var(--foreground)',
            }}
          >
            <span
              className="absolute right-0.5 top-0.5 rounded px-1 py-px text-[8.5px] font-black leading-tight"
              style={
                error.isElimination
                  ? { background: 'var(--destructive)', color: '#fff' }
                  : { background: 'var(--danger-soft)', color: 'var(--destructive)' }
              }
            >
              {error.isElimination ? 'LOẠI' : `${error.points}đ`}
            </span>
            {error.label}
          </button>
        ))}
      </div>
    </div>
  );
}
