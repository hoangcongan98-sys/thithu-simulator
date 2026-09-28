import { X } from 'lucide-react';

export default function ScoreBoard({ penalties, score, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-2xl border p-4 shadow-xl"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[16px] font-black text-foreground">Bảng điểm chi tiết</h3>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full hover:bg-secondary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Score summary */}
        <div className="mb-3 rounded-xl p-3 text-center" style={{ background: 'var(--secondary)' }}>
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
            Tổng điểm
          </div>
          <div
            className="text-[36px] font-black leading-none tabular-nums mt-1"
            style={{ color: score >= 80 ? 'var(--accent-foreground)' : 'var(--destructive)' }}
          >
            {score}
          </div>
          <div className="mt-1 text-[11px] font-bold" style={{ color: score >= 80 ? '#059669' : '#dc2626' }}>
            {score >= 80 ? 'ĐẠT' : 'KHÔNG ĐẠT'}
          </div>
        </div>

        {/* Penalties list */}
        <div className="max-h-60 overflow-y-auto space-y-1">
          {penalties.length === 0 ? (
            <p className="text-center text-[12px] text-muted-foreground py-4">
              Chưa có lỗi nào
            </p>
          ) : (
            penalties.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border px-3 py-2"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-foreground">{p.label}</span>
                  <span className="text-[10px] text-muted-foreground">{p.timestamp}</span>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-black"
                  style={
                    p.isElimination
                      ? { background: 'var(--destructive)', color: '#fff' }
                      : { background: 'var(--danger-soft)', color: 'var(--destructive)' }
                  }
                >
                  {p.isElimination ? 'LOẠI' : `${p.points}đ`}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
