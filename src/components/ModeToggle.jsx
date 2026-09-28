export default function ModeToggle({ mode, onChangeMode }) {
  return (
    <div className="ds-card mt-2 grid grid-cols-2 gap-1 p-1" style={{ borderRadius: 15 }}>
      <button
        onClick={() => onChangeMode('sahinh')}
        className="min-h-9 rounded-xl py-1.5 text-[13px] font-extrabold transition-colors"
        style={
          mode === 'sahinh'
            ? { background: 'var(--brand-grad)', color: '#fff', boxShadow: 'var(--shadow-pop)' }
            : { color: 'var(--muted-foreground)' }
        }
      >
        Sa hình
      </button>
      <button
        onClick={() => onChangeMode('duongtruong')}
        className="min-h-9 rounded-xl py-1.5 text-[13px] font-extrabold transition-colors"
        style={
          mode === 'duongtruong'
            ? { background: 'var(--brand-grad)', color: '#fff', boxShadow: 'var(--shadow-pop)' }
            : { color: 'var(--muted-foreground)' }
        }
      >
        Đường trường
      </button>
    </div>
  );
}
