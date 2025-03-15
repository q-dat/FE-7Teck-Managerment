export const slugify = (text: string) => {
  return text
    .toString()
    .normalize('NFD') // Chuyển sang Unicode
    .replace(/\p{Diacritic}/gu, '') // Loại bỏ dấu
    .toLowerCase() // Chuyển tất cả thành chữ thường
    .replace(/[^a-z0-9]+/g, '-') // Thay thế khoảng trắng và ký tự không phải chữ cái bằng dấu gạch ngang
    .replace(/^-+|-+$/g, ''); // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi
};
