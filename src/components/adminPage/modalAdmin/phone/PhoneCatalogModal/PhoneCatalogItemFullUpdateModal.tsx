import React, { useState } from 'react';
import { Button, Textarea } from 'react-daisyui';
import { Toastify } from '../../../../../helper/Toastify';
import { RiCloseLine, RiRefreshLine } from 'react-icons/ri';

interface ModalUpdateFullPhoneCatalogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  phoneCatalogId: string;
}

const PhoneCatalogItemFullUpdateModal: React.FC<ModalUpdateFullPhoneCatalogProps> = ({
  isOpen,
  onClose,
  onSuccess,
  phoneCatalogId
}) => {
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_PORT;

  const handleImport = async () => {
    if (!jsonInput.trim()) {
      Toastify('Vui lòng nhập JSON!', 400);
      return;
    }

    let parsedData: unknown;

    try {
      parsedData = JSON.parse(jsonInput);
    } catch {
      Toastify('JSON không hợp lệ!', 400);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/phone-catalog/${phoneCatalogId}/full-update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData)
      });

      const result = await response.json();

      if (response.ok) {
        Toastify('Cập nhật toàn bộ cấu trúc thành công!', 200);
        onSuccess();
        onClose();
        setJsonInput('');
      } else {
        Toastify(result.message || 'Lỗi từ server', 500);
      }
    } catch {
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
        <h2 className="py-2 text-center text-2xl font-bold text-primary dark:text-white">Update Full Phone Catalog</h2>

        <Textarea
          className="my-2 h-[80vh] w-full border-black bg-white text-xs placeholder:text-black/50 focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder:text-white/50"
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
          placeholder={`Dán JSON ở đây... (Copy từ Excel hoặc file mẫu)
        Ví dụ:
            {
            "name": "Xiaomi Redmi 14c 4GB/128GB",
            "slug": "xiaomi-redmi-14c-4gb-128gb",
            "img": "https://res.cloudinary.com/cloud7teck/image/upload/1/123.jpg",
            "price": 3360,
            "status": 0,
            "content": "New",
            "configuration_and_memory": {
              "operating_system": "Android 14",
              "cpu_chip": "MediaTek Helio G81-Ultra 8 nhân",
              "cpu_speed": "2 GHz",
              "gpu": "Mali-G52 MC2",
              "ram": "4GB",
              "storage_capacity": "128GB",
              "remaining_capacity": "115 GB",
              "memory_card": "MicroSD, hỗ trợ tối đa 1 TB",
              "contacts": "Không giới hạn"
            },
            "camera_and_screen": {
              "rear_camera_resolution": "Chính 50 MP & Phụ QVGA",
              "rear_camera_video": [
                "HD 720p@30fps",
                "FullHD 1080p@30fps"
              ],
              "rear_camera_flash": "Có",
              "rear_camera_features": [
                "Xóa phông",
                "Trôi nhanh thời gian (Time Lapse)",
                "Siêu độ phân giải",
                "HDR",
                "Ban đêm (Night Mode)"
              ],
              "front_camera_resolution": "13 MP",
              "front_camera_features": [
                "Xóa phông",
                "Trôi nhanh thời gian (Time Lapse)",
                "HDR",
                "Chụp đêm"
              ],
              "screen_technology": "IPS LCD",
              "screen_resolution": "HD+ (720 x 1640 Pixels)",
              "screen_size": "6.88\"",
              "max_brightness": "600 nits",
              "touchscreen_glass": "Kính cường lực Corning Gorilla Glass 3"
            },
            "battery_and_charging": {
              "battery_capacity": "5160 mAh",
              "battery_type": "Li-Po",
              "max_charging_support": "18 W",
              "battery_technology": [
                "Tiết kiệm pin",
                "Sạc pin nhanh"
              ]
            },
            "features": {
              "advanced_security": [
                "Mở khoá vân tay cạnh viền",
                "Mở khoá khuôn mặt"
              ],
              "special_features": [
                "Mở rộng bộ nhớ RAM"
              ],
              "water_dust_resistant": "IP54 (Ví dụ)", 
              "voice_recording": [
                "Ghi âm mặc định",
                "Ghi âm cuộc gọi"
              ],
              "radio": [
                "Có"
              ],
              "video_playback": "Có",
              "music_playback": [
                "OGG",
                "Midi",
                "MP3",
                "FLAC"
              ]
            },
            "connectivity": {
              "mobile_network": "Hỗ trợ 4G",
              "sim": "2 Nano SIM",
              "wifi": [
                "Wi-Fi hotspot",
                "Wi-Fi Direct",
                "Wi-Fi 802.11 a/b/g/n/ac",
                "Dual-band (2.4 GHz/5 GHz)"
              ],
              "gps": [
                "GPS",
                "GLONASS",
                "GALILEO",
                "BEIDOU"
              ],
              "bluetooth": "5.4",
              "charging_connection_port": "Type-C",
              "headphone_jack": "3.5 mm",
              "other_connectivity": "OTG"
            },
            "design_and_material": {
              "design": "Nguyên khối",
              "material": "Khung & Mặt lưng nhựa",
              "dimensions_and_weight": "Dài 171.88 mm - Ngang 77.8 mm - Dày 8.22 mm - Nặng 207 g",
              "release_date": "08/2024",
              "brand": "Xiaomi"
            }
          }`}
          bordered
        />

        <div className="flex justify-end gap-4">
          <Button size="sm" className="text-white" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button size="sm" color="primary" onClick={handleImport} disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <RiRefreshLine className="text-lg" />
                Update
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCatalogItemFullUpdateModal;
