import React from 'react';
import { Button } from 'react-daisyui';
import { useEscClose } from '../../hooks/useEscClose';

type Props = {
  open: boolean;
  onClose: () => void;
};

const priceFormatExample = `
Samsung | Galaxy S24 Ultra | 12GB/256GB | Black
Xiaomi | Redmi 13X | 6GB/128GB | Blue
realme | 16 Pro 5G | 12GB/256GB | Silver
...`;

const catalogJsonExample = `
[
  { "catalogName": "Samsung Galaxy Z Fold7 512GB",
 "name": "Samsung Galaxy Z Fold7 512GB",
 "color": "Xám",
 "img": "https://res.cloudinary.com/cloud7teck/image/upload/1/123.jpg",
 "thumbnail": ["https://res.cloudinary.com/cloud7teck/image/upload/1/123.jpg"],
 "price": 40800,
 "status": "New",
 "des": "",
 "note": "" },

  { "catalogName": "Samsung Galaxy Z Fold7 512GB",
 "name": "Samsung Galaxy Z Fold7 512GB",
 "color": "Đen",
 "img": "https://res.cloudinary.com/cloud7teck/image/upload/1/123.jpg",
 "thumbnail": ["https://res.cloudinary.com/cloud7teck/image/upload/1/123.jpg"],
 "price": 40800,
 "status": "New",
 "des": "",
 "note": "" },
 ...`;

const apiJsonExample = `
{
  "message": "Lấy danh sách điện thoại thành công!",
  "count": 276,
  "visibleCount": 276,
  "phones": [
    {
      "_id": "692ceb4d438ce1156b483dfa",
      "phone_catalog_id": {
        "_id": "692c69c1b4d1b9ace7602771",
        "name": "Xiaomi Redmi Note 14 8GB/256GB",
        "img": "https://res.cloudinary.com/cloud7teck/image/upload/1/123.jpg",
        "price": 5700,
        "status": 0,
        "content": "New",
        "configuration_and_memory": {
          "ram": "8GB",
          "storage_capacity": "256GB"
        }
      },
      "name": "Xiaomi Redmi Note 14 8GB/256GB",
      "view": 791,
      "color": "Tím",
      "img": "https://res.cloudinary.com/cloud7teck/image/upload/1/123.jpg",
      "thumbnail": ["https://res.cloudinary.com/cloud7teck/image/upload/1/123.jpg"],
      "price": 5700,
      "sale": 5700,
      "status": "New",
      "des": "",
      "note": "",
      "createdAt": "2025-12-01T01:11:41.246Z",
      "updatedAt": "2026-03-05T04:37:18.667Z",
      "__v": 0,
      "slug": "Xiaomi Redmi Note 14 8GB/256GB"
    },
    ...`;

const HelpModal: React.FC<Props> = ({ open, onClose }) => {
  useEscClose(open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
      <div
        className="relative overflow-auto rounded-xl border border-gray-300 bg-white p-2 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
        style={{
          width: 'calc(100vw - 20vw)',
          height: 'calc(100vh - 20vh)'
        }}
      >
        <div className="mb-5 flex items-center justify-between rounded-lg bg-black p-2 text-gray-400">
          <h2 className="font-semibold">Hướng dẫn import dữ liệu đầu vào:</h2>

          <Button size="xs" onClick={onClose}>
            ESC / Đóng
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-10">
            <div>
              <p className="rounded-t-md border border-x-2 border-y-0 border-green-500 bg-gray-600 p-1 text-sm font-semibold text-white">
                Import bảng giá
              </p>

              <pre className="rounded bg-gray-400 p-1 text-[10px] text-black dark:bg-gray-800 dark:text-green-500">
                {priceFormatExample}
              </pre>

              <p className="text-sm text-white">
                bấm <b>BRAND | MODEL | RAM/STORAGE | COLOR</b>
              </p>
            </div>

            <div>
              <p className="rounded-t-md border border-x-2 border-y-0 border-green-500 bg-gray-600 p-1 text-sm font-semibold text-white">
                Import Catalog JSON
              </p>

              <pre className="rounded bg-gray-400 p-1 text-[10px] text-black dark:bg-gray-800 dark:text-green-500">
                {catalogJsonExample}
              </pre>

              <p className="text-sm text-white">
                bấm <b>Import Catalog JSON</b>
              </p>
            </div>
          </div>

          <div>
            <p className="rounded-t-md border border-x-2 border-y-0 border-green-500 bg-gray-600 p-1 text-sm font-semibold text-white">
              Format JSON API
            </p>

            <pre className="rounded bg-gray-400 p-1 text-[10px] text-black dark:bg-gray-800 dark:text-green-500">
              {apiJsonExample}
            </pre>

            <p className="text-sm text-white">
              bấm <b>Format Phones API</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
