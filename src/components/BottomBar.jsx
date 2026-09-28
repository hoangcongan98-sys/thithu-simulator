import { TriangleAlert } from 'lucide-react';

export default function BottomBar({ onTingTong, onPlayCommand, onTun }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <div className="mx-auto max-w-[480px] px-4 py-2 safe-bottom">
        <div className="flex gap-2">
          <button
            onClick={onTingTong}
            className="relative flex flex-1 flex-col items-center justify-center gap-0.5 overflow-hidden font-extrabold text-white transition-transform active:scale-[0.98] h-12 rounded-xl text-[12.5px]"
            style={{ background: '#059669' }}
          >
            <TriangleAlert size={18} className="shrink-0" />
            <span className="relative z-[1]">Ting tong</span>
          </button>
          <button
            onClick={onPlayCommand}
            className="relative flex flex-1 flex-col items-center justify-center gap-0.5 overflow-hidden font-extrabold text-white transition-transform active:scale-[0.98] h-12 rounded-xl text-[12.5px]"
            style={{ background: '#d97706' }}
          >
            <TriangleAlert size={18} className="shrink-0" />
            <span className="relative z-[1]">Phát hiệu lệnh</span>
          </button>
          <button
            onClick={onTun}
            className="relative flex flex-1 flex-col items-center justify-center gap-0.5 overflow-hidden font-extrabold text-white transition-transform active:scale-[0.98] h-12 rounded-xl text-[12.5px]"
            style={{ background: '#dc2626' }}
          >
            <TriangleAlert size={18} className="shrink-0" />
            <span className="relative z-[1]">Tun</span>
          </button>
        </div>
      </div>
    </div>
  );
}
