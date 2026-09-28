import { CircleCheck, CircleX, TriangleAlert } from 'lucide-react';

export default function ResultButtons({ onResult }) {
  return (
    <div>
      <div className="mt-3 mb-1.5">
        <h3 className="text-[15px] font-extrabold text-foreground">Kết quả bài thi</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onResult('pass')}
          className="relative flex flex-1 flex-col items-center justify-center gap-0.5 overflow-hidden font-extrabold text-white transition-transform active:scale-[0.98] h-14 rounded-2xl text-[13.5px]"
          style={{ background: '#059669' }}
        >
          <CircleCheck size={20} className="shrink-0" />
          <span className="relative z-[1]">Đậu</span>
        </button>
        <button
          onClick={() => onResult('fail')}
          className="relative flex flex-1 flex-col items-center justify-center gap-0.5 overflow-hidden font-extrabold text-white transition-transform active:scale-[0.98] h-14 rounded-2xl text-[13.5px]"
          style={{ background: '#dc2626' }}
        >
          <CircleX size={20} className="shrink-0" />
          <span className="relative z-[1]">Trượt</span>
        </button>
        <button
          onClick={() => onResult('revoke')}
          className="relative flex flex-1 flex-col items-center justify-center gap-0.5 overflow-hidden font-extrabold text-white transition-transform active:scale-[0.98] h-14 rounded-2xl text-[13.5px]"
          style={{ background: '#d97706' }}
        >
          <TriangleAlert size={20} className="shrink-0" />
          <span className="relative z-[1]">Tước quyền</span>
        </button>
      </div>
    </div>
  );
}
