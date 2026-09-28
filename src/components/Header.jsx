import { ChevronLeft, Sun, Moon } from 'lucide-react';

export default function Header({ darkMode, onToggleDark }) {
  return (
    <header className="relative z-20 shrink-0 border-b border-transparent bg-[#f6fdfc] dark:bg-[#0a1311] sm:rounded-t-[2.5rem]">
      <div className="min-h-16 items-center gap-2 px-3.5 py-2.5 grid grid-cols-[40px_minmax(0,1fr)_40px]">
        {/* Back button */}
        <button
          type="button"
          className="group cursor-pointer flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/80 border border-border/60 text-foreground transition-all duration-200 hover:bg-secondary hover:border-primary/50 hover:text-primary active:scale-90"
          aria-label="Trở về"
        >
          <ChevronLeft size={22} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        {/* Logo */}
        <div className="flex min-w-0 flex-1 justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2.5 font-sans outline-none py-1"
            aria-label="ThiThu.app"
          >
            <div
              className="flex items-center justify-center shrink-0 overflow-hidden"
              style={{
                width: 32,
                height: 32,
                borderRadius: '26%',
                background: 'linear-gradient(145deg, #16bdad, #0a7c72)',
                boxShadow: 'inset 0 1px 1.5px rgba(255,255,255,0.4), 0 6px 16px -6px rgba(7,94,85,0.45)',
              }}
            >
              <svg width="23" height="23" viewBox="0 0 100 100" fill="none">
                <rect x="31" y="10" width="38" height="80" rx="19" fill="none" stroke="#fff" strokeWidth="7" />
                <circle cx="50" cy="29" r="7.5" fill="#fff" opacity="0.35" />
                <circle cx="50" cy="50" r="7.5" fill="#fff" opacity="0.35" />
                <circle cx="50" cy="71" r="9.5" fill="#fff" />
              </svg>
            </div>
            <span className="text-lg font-black leading-none tracking-tight text-foreground">
              thithu<span style={{ color: 'var(--primary)' }}>.app</span>
            </span>
          </a>
        </div>

        {/* Dark mode toggle */}
        <div className="flex shrink-0 items-center justify-end">
          <button
            onClick={onToggleDark}
            className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Đổi giao diện sáng/tối"
          >
            {darkMode ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
