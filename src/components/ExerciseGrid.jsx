export default function ExerciseGrid({ exercises, selectedId, onSelect }) {
  return (
    <section className="mt-2">
      <h2 className="mb-2 text-[16px] font-black text-foreground">Chọn bài thi</h2>
      <div className="grid grid-cols-3 gap-2">
        {exercises.map((ex) => {
          const isActive = selectedId === ex.id;
          const isKC = ex.id === 'KC';

          return (
            <button
              key={ex.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(ex.id)}
              className="min-h-11 rounded-[14px] border px-2 py-1 text-left transition-[transform,background-color,border-color,box-shadow] active:scale-[0.98]"
              style={
                isActive
                  ? {
                      background: 'var(--accent)',
                      borderColor: 'var(--ring)',
                      boxShadow: 'var(--shadow-card)',
                    }
                  : {
                      background: 'var(--card)',
                      borderColor: 'var(--border)',
                    }
              }
            >
              <span className="flex items-center gap-1.5">
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-black"
                  style={
                    isActive
                      ? {
                          background: 'var(--accent-foreground)',
                          color: 'var(--accent)',
                        }
                      : isKC
                      ? {
                          background: 'var(--destructive)',
                          color: '#fff',
                        }
                      : {
                          background: 'var(--secondary)',
                          color: 'var(--muted-foreground)',
                        }
                  }
                >
                  {ex.badge}
                </span>
                <span className="min-w-0 text-[11.5px] font-extrabold leading-[1.2] text-foreground">
                  {ex.name}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
