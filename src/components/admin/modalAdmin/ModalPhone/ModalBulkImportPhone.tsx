import React, { useMemo, useState } from 'react';
import { Button, Textarea } from 'react-daisyui';
import { RiCloseLine, RiUploadCloud2Line } from 'react-icons/ri';
import { Toastify } from '../../../../helper/Toastify';

interface BulkImportItem {
  catalogName: string; // Tên chính xác trong PhoneCatalog
  name: string; // Tên variant
  color: string;
  img: string; // Cloudinary URL
  thumbnail: string[]; // Array Cloudinary URLs
  price: number;
  sale?: number;
  status: string;
  des?: string;
  note?: string;
}

interface ModalBulkImportProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ModalBulkImportPhone: React.FC<ModalBulkImportProps> = ({ isOpen, onClose, onSuccess }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_PORT;

  // Tính số lượng sản phẩm từ JSON input (dùng useMemo để tối ưu)
  const itemCount = useMemo(() => {
    if (!jsonInput.trim()) return 0;
    try {
      const parsed = JSON.parse(jsonInput);
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch {
      return 0;
    }
  }, [jsonInput]);

  const handleImport = async () => {
    if (!jsonInput.trim()) {
      Toastify('Vui lòng dán dữ liệu JSON!', 400);
      return;
    }

    let data: BulkImportItem[];
    try {
      data = JSON.parse(jsonInput);
      if (!Array.isArray(data)) throw new Error('Dữ liệu phải là một mảng JSON');
    } catch (err) {
      Toastify('JSON không hợp lệ! ' + err, 400);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/phones/bulk-import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        Toastify(
          `Import thành công! Tạo mới: ${result.success} | Cập nhật: ${result.updated} | Lỗi: ${result.failed}`,
          200
        );
        onSuccess?.(); // Reload danh sách
        onClose();
        setJsonInput(''); // Xóa form
      } else {
        Toastify(result.message || 'Lỗi từ server', 500);
      }
    } catch (err) {
      console.error('Lỗi kết nối:', err);
      Toastify('Không thể kết nối đến server. Kiểm tra backend!', 500);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full mx-[10vw] overflow-y-auto rounded-md bg-white p-2 shadow-2xl dark:bg-gray-800"
        onClick={e => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 text-3xl text-gray-500 transition-colors hover:text-red-600"
        >
          <RiCloseLine />
        </button>

        {/* Tiêu đề */}
        <h2 className="font-bold text-2xl text-primary py-2 text-center">Bulk Import Điện Thoại</h2>

        {/* Ô nhập JSON */}
        <Textarea
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
          placeholder={`Dán JSON ở đây... (Copy từ Excel hoặc file mẫu)\n\nVí dụ:\n[\n  {\n    "catalogName": "Samsung Galaxy A56 5G 8GB/128GB",\n    "name": "Samsung Galaxy A56 5G 8GB/128GB - Hồng",\n    "color": "Hồng",\n    "img": "https://res.cloudinary.com/cloud7teck/image/upload/v1763551728/m1mh7igu1a6xzlzrtmlp.jpg",\n    "thumbnail": [\n      "https://res.cloudinary.com/cloud7teck/image/upload/v1763551728/kg4muutp7pf7ioftob7r.jpg",\n      "...\n    ],\n    "price": 8250,\n    "sale": 7990,\n    "status": "New",\n    "note": "Tặng sạc 45W"\n  }\n]`}
          className="h-[60vh] w-full focus:outline-none"
          bordered
        />
        <p> Import Ngay ({itemCount} sản phẩm)</p>
        {/* Nút hành động */}
        <div className="mt-8 flex justify-end gap-4">
          <Button onClick={onClose} color="ghost" size="lg">
            Hủy bỏ
          </Button>
          <Button
            onClick={handleImport}
            color="accent"
            disabled={loading || !jsonInput.trim()}
            className="flex items-center gap-3 px-8 font-bold shadow-lg hover:shadow-accent/50"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Đang import...
              </>
            ) : (
              <>
                <RiUploadCloud2Line className="text-xl" />
                Import
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalBulkImportPhone;
