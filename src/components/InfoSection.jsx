import { BookOpen, ChevronDown, CircleCheck } from 'lucide-react';

export default function InfoSection() {
  return (
    <details className="group mt-8 rounded-[22px] border border-border/80 bg-card p-4 shadow-xs transition-all open:border-primary/40 open:shadow-md">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-black text-[14px] text-foreground select-none [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-2">
          <BookOpen size={18} className="text-primary shrink-0" />
          <span>Tìm hiểu về Thiết bị giả lập thi sát hạch miễn phí</span>
        </div>
        <ChevronDown size={16} className="text-muted-foreground transition-transform duration-200 group-open:rotate-180 shrink-0" />
      </summary>
      <div className="mt-4 pt-4 border-t border-border/60 space-y-4 text-[13px] leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-[14.5px] font-black text-foreground tracking-tight">
            Ứng dụng Thiết bị giả lập thi sát hạch lái xe trực tuyến miễn phí
          </h2>
          <p>
            Kỳ thi sát hạch lái xe ô tô sử dụng hệ thống thiết bị chấm điểm tự động tích hợp trên xe thi và sân sa hình. Âm thanh thông báo lệnh, tiếng tín hiệu đếm ngược và còi báo trừ điểm từ thiết bị sát hạch thường tạo nên áp lực tâm lý không nhỏ cho học viên.
          </p>
          <p>
            Ứng dụng này giúp giáo viên dạy lái xe và học viên rèn luyện phản xạ nghe - thao tác chuẩn xác, chủ động tâm lý thi đỗ ngay trong lần sát hạch đầu tiên.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-[13.5px] font-extrabold text-foreground">Tính năng nổi bật</h3>
          <ul className="space-y-2">
            {[
              { title: 'Khẩu lệnh chuẩn 100%', desc: 'Tái hiện đầy đủ hệ thống âm thanh khẩu lệnh sát hạch từ bài xuất phát đến thông báo kết quả.' },
              { title: 'Chấm điểm tự động', desc: 'Mô phỏng đồng hồ đếm ngược 18 phút sa hình và tính điểm theo quy chuẩn.' },
              { title: 'Đầy đủ Sa hình & Đường trường', desc: 'Luyện tập trọn bộ 11 bài thi sa hình và bài đường trường.' },
              { title: 'Miễn phí 100%', desc: 'Không cần tải ứng dụng, chạy mượt trên cả điện thoại và máy tính.' },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CircleCheck size={16} className="text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>{item.title}:</strong> {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-[13.5px] font-extrabold text-foreground">Hướng dẫn sử dụng</h3>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li><strong>Chọn chế độ thi:</strong> Chuyển đổi giữa <em>Sa hình</em> hoặc <em>Đường trường</em>.</li>
            <li><strong>Bắt đầu lượt thi:</strong> Bấm nút <strong>Thi thật</strong> để kích hoạt đồng hồ và hệ thống tính điểm.</li>
            <li><strong>Phát khẩu lệnh & báo lỗi:</strong> Chọn bài để phát hiệu lệnh. Bấm các nút lỗi để trừ điểm.</li>
            <li><strong>Kết thúc:</strong> Đạt từ 80/100 điểm sẽ ĐẬU kỳ thi.</li>
          </ol>
        </section>
      </div>
    </details>
  );
}
