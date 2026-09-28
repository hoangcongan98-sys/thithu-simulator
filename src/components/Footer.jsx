import { House, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <div>
      <p className="text-[12.5px] text-muted-foreground text-center leading-relaxed mt-9">
        Đây chỉ là <b className="text-foreground">mô phỏng thiết bị sa hình, đường trường</b>.
      </p>

      {/* Breadcrumb */}
      <div className="mt-6 pt-4 pb-2 border-t border-border/40 flex justify-center">
        <nav aria-label="Breadcrumb" className="text-[12.5px] text-muted-foreground">
          <ol className="flex items-center gap-1.5 leading-none">
            <li className="flex items-center gap-1.5">
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-1 font-medium">
                <House size={14} className="shrink-0" />
                <span>Trang chủ</span>
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight size={14} className="text-muted-foreground/50 shrink-0" />
              <span className="font-semibold text-foreground">
                Giả lập thiết bị sát hạch
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Footer content */}
      <div className="mt-3 flex justify-center">
        <footer className="flex flex-col items-center gap-3 w-full">
          <div className="text-[11px] font-extrabold tracking-wider text-muted-foreground/80 uppercase">
            Giả lập sát hạch
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-3">
            {[
              { label: 'Facebook', href: '#', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07Z" />
                </svg>
              )},
              { label: 'YouTube', href: '#', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z" />
                </svg>
              )},
              { label: 'TikTok', href: '#', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.97a2.59 2.59 0 0 1-2.58 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.3-2.49v-3.3a5.88 5.88 0 0 0-6.6 5.79A5.88 5.88 0 0 0 9.76 24a5.88 5.88 0 0 0 5.88-5.88V9.4a7.45 7.45 0 0 0 4.36 1.4V7.6a4.28 4.28 0 0 1-3.4-1.78Z" />
                </svg>
              )},
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors active:scale-90"
                style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--secondary)', border: '1px solid var(--border)' }}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/50 text-center mt-1 w-full">
            <p className="text-[11.5px] text-muted-foreground leading-relaxed font-medium">
              <strong className="font-bold text-foreground/80">Lưu ý:</strong> Đây là ứng dụng mô phỏng độc lập, không thuộc quản lý và không đại diện cho bất kỳ cơ quan hay tổ chức chính phủ nào.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
