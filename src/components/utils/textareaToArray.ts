export const textareaToArray = (value: string | undefined | null): string[] => {
  if (!value) return [];
  return value
    .split(/[\n,]/g)        // tách theo dấu phẩy hoặc xuống dòng
    .map(item => item.trim()) // bỏ khoảng trắng dư
    .filter(item => item.length > 0); // loại item rỗng
};
