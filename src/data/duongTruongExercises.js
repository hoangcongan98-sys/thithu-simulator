// Đường trường (road driving) exercise data

export const duongTruongErrors = [
  { label: 'Không thắt dây an toàn', points: -5, isElimination: false },
  { label: 'Không điều chỉnh gương', points: -5, isElimination: false },
  { label: 'Không bật xi nhan khi chuyển làn', points: -5, isElimination: false },
  { label: 'Không bật xi nhan khi rẽ', points: -5, isElimination: false },
  { label: 'Không nhường đường ưu tiên', points: -5, isElimination: false },
  { label: 'Vượt quá tốc độ quy định', points: 0, isElimination: true },
  { label: 'Đi sai làn đường', points: -5, isElimination: false },
  { label: 'Không quan sát khi sang đường', points: -5, isElimination: false },
  { label: 'Phanh gấp không an toàn', points: -5, isElimination: false },
  { label: 'Vượt đèn đỏ', points: 0, isElimination: true },
  { label: 'Chết máy', points: -5, isElimination: false },
  { label: 'Lùi xe trên đường', points: 0, isElimination: true },
  { label: 'Va chạm', points: 0, isElimination: true },
  { label: 'Đi lên vỉa hè', points: 0, isElimination: true },
  { label: 'Dừng đỗ sai quy định', points: -5, isElimination: false },
];

export const duongTruongExercise = {
  id: 'dt',
  name: 'Đường trường',
  command: 'Bài thi đường trường. Thí sinh chuẩn bị. Bắt đầu.',
  errors: duongTruongErrors,
};
