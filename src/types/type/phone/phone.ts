export interface IPhone {
  _id: string;
  phone_catalog_id: string; // Phone catalog ID // Danh mục điện thoại
  name: string; // Name // Tên
  img: string; // Main image URL // Đường dẫn ảnh chính
  thumbnail?: string; // Thumbnail image URL // Đường dẫn ảnh thu nhỏ
  des?: string; // Product description // Mô tả sản phẩm
  status: string; // Product status // Trạng thái sản phẩm
  price: number; // Product price // Giá sản phẩm
  createdAt: string; // Creation date // Thời gian tạo
  updatedAt: string; // Last updated date // Thời gian cập nhật
  configuration_and_memory: {
    // Configuration and memory // Cấu hình và bộ nhớ
    operating_system: string; // Operating system // Hệ điều hành
    cpu_chip: string; // CPU chip // Chip xử lý CPU
    cpu_speed: string; // CPU speed // Tốc độ CPU
    gpu: string; // Graphics chip (GPU) // Chip đồ họa (GPU)
    ram: string; // RAM // RAM
    storage_capacity: string; // Storage capacity // Dung lượng lưu trữ
    remaining_capacity: string; // Remaining available storage // Dung lượng còn lại/Dung lượng khả dụng
    memory_card: string; // Memory card // Thẻ nhớ
    contacts: string; // Contacts // Danh bạ
  };
  camera_and_screen: {
    // Camera and screen // Camera và màn hình
    rear_camera_resolution: string; // Rear camera resolution // Độ phân giải camera sau
    rear_camera_video: string[]; // Rear camera video recording // Quay phim camera sau
    rear_camera_flash: string; // Rear camera flash // Đèn Flash camera sau
    rear_camera_features: string[]; // Rear camera features // Tính năng camera sau
    front_camera_resolution: string; // Front camera resolution // Độ phân giải camera trước
    front_camera_features: string[]; // Front camera features // Tính năng camera trước
    screen_technology: string; // Screen technology // Công nghệ màn hình
    screen_resolution: string; // Screen resolution // Độ phân giải màn hình
    screen_size: string; // Screen size // Màn hình rộng
    max_brightness: string; // Maximum brightness // Độ sáng tối đa
    touchscreen_glass: string; // Touchscreen glass // Mặt kính cảm ứng
  };
  battery_and_charging: {
    // Battery and charging // Pin và sạc
    battery_capacity: string; // Battery capacity // Dung lượng pin
    battery_type: string; // Battery type // Loại pin
    max_charging_support: string; // Maximum charging support // Hỗ trợ sạc tối đa
    battery_technology: string[]; // Battery technology // Công nghệ pin
  };
  features: {
    // Features // Tiện ích
    advanced_security: string[]; // Advanced security // Bảo mật nâng cao
    special_features: string[]; // Special features // Tính năng đặc biệt
    water_dust_resistant: string; // Water/dust resistance // Kháng nước/bụi
    voice_recording: string[]; // Voice recording // Ghi âm
    radio: string[]; // Radio // Radio
    video_playback: string; // Video playback // Xem phim
    music_playback: string[]; // Music playback // Nghe nhạc
  };
  connectivity: {
    // Connectivity // Kết nối
    mobile_network: string; // Mobile network // Mạng di động
    sim: string; // SIM // Sim
    wifi: string[]; // Wi-Fi // WIFI
    gps: string[]; // GPS // GPS
    bluetooth: string; // Bluetooth // Bluetooth
    charging_connection_port: string; // Charging/connection port // Cổng kết nối/sạc
    headphone_jack: string; // Headphone jack // Jack tai nghe
    other_connectivity: string; // Other connectivity // Kết nối khác
  };
  design_and_material: {
    // Design and material // Thiết kế và chất liệu
    design: string; // Design // Thiết kế
    material: string; // Material // Chất liệu
    dimensions_and_weight: string; // Dimensions and weight // Kích thước và khối lượng
    release_date: string; // Release date // Thời điểm ra mắt
    brand: string; // Brand // Hãng
  };
}
