import { IPhoneCatalog } from '../phone-catalog/phoneCatalog';

export interface IPhone {
  _id: string;
  name: string; // Tên
  phone_catalog_id: IPhoneCatalog; // Danh mục điện thoại
  price: number; // Giá sản phẩm
  sale?: number; // Giảm giá
  color: string; // Màu
  status: string; // Trạng thái sản phẩm
  des?: string; // Mô tả sản phẩm
  img: string; // Đường dẫn ảnh chính
  thumbnail?: string; // Đường dẫn ảnh thu nhỏ
  createdAt: string; // Thời gian tạo
  updatedAt: string; // Thời gian cập nhật
  configuration_and_memory: {
    // Cấu hình và bộ nhớ
    operating_system: string; // Hệ điều hành
    cpu_chip: string; //Chip xử lý CPU
    cpu_speed: string; // Tốc độ CPU
    gpu: string; // Chip đồ họa GPU
    ram: string; // RAM
    storage_capacity: string; // Dung lượng lưu trữ
    remaining_capacity: string; //Dung lượng khả dụng
    memory_card: string; // Thẻ nhớ
    contacts: string; // Danh bạ
  };
  camera_and_screen: {
    // Camera và màn hình
    rear_camera_resolution: string; // Độ phân giải camera sau
    rear_camera_video: string[]; // Quay phim camera sau
    rear_camera_flash: string; // Đèn Flash camera sau
    rear_camera_features: string[]; // Tính năng camera sau
    front_camera_resolution: string; // Độ phân giải camera trước
    front_camera_features: string[]; // Tính năng camera trước
    screen_technology: string; // Công nghệ màn hình
    screen_resolution: string; // Độ phân giải màn hình
    screen_size: string; // Màn hình rộng
    max_brightness: string; // Độ sáng tối đa
    touchscreen_glass: string; // Mặt kính cảm ứng
  };
  battery_and_charging: {
    // Pin và sạc
    battery_capacity: string; // Dung lượng pin
    battery_type: string; // Loại pin
    max_charging_support: string; // Hỗ trợ sạc tối đa
    battery_technology: string[]; // Công nghệ pin
  };
  features: {
    // Tiện ích
    advanced_security: string[]; // Bảo mật nâng cao
    special_features: string[]; // Tính năng đặc biệt
    water_dust_resistant: string; // Kháng nước/bụi
    voice_recording: string[]; // Ghi âm
    radio: string[]; // Radio
    video_playback: string; // Xem phim
    music_playback: string[]; // Nghe nhạc
  };
  connectivity: {
    // Kết nối
    mobile_network: string; // Mạng di động
    sim: string; // Sim
    wifi: string[]; // WIFI
    gps: string[]; // GPS
    bluetooth: string; // Bluetooth
    charging_connection_port: string; // Cổng kết nối/sạc
    headphone_jack: string; // Jack tai nghe
    other_connectivity: string; // Kết nối khác
  };
  design_and_material: {
    // Thiết kế và chất liệu
    design: string; // Thiết kế
    material: string; // Chất liệu
    dimensions_and_weight: string; // Kích thước và khối lượng
    release_date: string; // Thời điểm ra mắt
    brand: string; // Hãng
  };
}
