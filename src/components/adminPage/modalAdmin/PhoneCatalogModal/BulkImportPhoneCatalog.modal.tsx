import React, { useMemo, useState } from 'react';
import { Button, Textarea } from 'react-daisyui';
import { Toastify } from '../../../../helper/Toastify';
import { RiCloseLine, RiUploadCloud2Line } from 'react-icons/ri';

interface BulkImportCatalogItem {
  name: string;
  img: string;
  price: number;
  status: number;
  content?: string;
  configuration_and_memory?: {
    ram?: string;
    storage_capacity?: string;
  };
}

interface ModalBulkImportProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ModalBulkImportPhoneCatalog: React.FC<ModalBulkImportProps> = ({ isOpen, onClose, onSuccess }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_PORT;

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

    let data: BulkImportCatalogItem[];

    try {
      data = JSON.parse(jsonInput);
      if (!Array.isArray(data)) throw new Error('Dữ liệu phải là mảng JSON');
    } catch (err) {
      Toastify('JSON không hợp lệ!', 400);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/phone-catalog/bulk-import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        Toastify(`Hoàn tất! Tạo mới: ${result.success} | Cập nhật: ${result.updated} | Lỗi: ${result.failed}`, 200);
        onSuccess();
        onClose();
        setJsonInput('');
      } else {
        Toastify(result.message || 'Lỗi từ server', 500);
      }
    } catch (err) {
      Toastify('Không thể kết nối server!', 500);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black bg-opacity-40 px-2 xl:px-0"
      onClick={onClose}
    >
      <div
        className="relative w-full cursor-default overflow-y-auto rounded-md bg-white p-2 dark:bg-gray-800 xl:w-2/3"
        onClick={e => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 text-3xl text-gray-500 transition-colors hover:scale-125 dark:text-white dark:hover:scale-125"
        >
          <RiCloseLine />
        </button>

        {/* Tiêu đề */}
        <h2 className="py-2 text-center text-2xl font-bold text-primary dark:text-white">Bulk Import Phone Catalog</h2>

        <Textarea
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
          placeholder={`Dán JSON ở đây... (Copy từ Excel hoặc file mẫu)\n\nVí dụ:\n[\n  {\n    "name": "Samsung Galaxy A56 5G",\n    "img": "https://...jpg",\n    "price": 8200,\n    "status": 1,\n    "content": "Mô tả..."\n  }\n]`}
          className="my-2 h-[80vh] w-full border-black bg-white text-xs placeholder:text-black/50 focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder:text-white/50"
          bordered
        />

        <div className="flex justify-end gap-4">
          <Button size="sm" className="text-white" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button
            size="sm"
            className="bg-primary text-white"
            onClick={handleImport}
            disabled={loading || !jsonInput.trim()}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <RiUploadCloud2Line className="text-xl" />

                {jsonInput.trim() && ` (${itemCount} danh mục)`}
                {jsonInput.trim() && itemCount === 0 && ' (JSON không hợp lệ)'}
                {jsonInput === '' && ' (Chưa có dữ liệu)'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalBulkImportPhoneCatalog;
