export interface ITabletCatalog {
    _id: string;
    name: string;
    img: string;
    price: number;
    status: number; // 0 NEW - 1 OLD
    content?: string; // Thông tin sản phẩm
    tabletCount: number;
    createdAt: string;
    updatedAt: string;
    
    camera_and_screen: {
      screen_technology: string; // Công nghệ màn hình
      screen_resolution: string; // Độ phân giải màn hình
      screen_size: string; // Màn hình rộng
      refresh_rate: string; // Tần số quét màn hình
      rear_camera_resolution: string; // Độ phân giải camera sau
      rear_camera_video: string[]; // Quay phim camera sau
      rear_camera_features: string[]; // Tính năng camera sau
      front_camera_resolution: string; // Độ phân giải camera trước
      front_camera_features: string[]; // Tính năng camera trước
    };
    
    configuration_and_memory: {
      operating_system: string; // Hệ điều hành
      cpu_chip: string; // Chip xử lý CPU
      cpu_speed: string; // Tốc độ CPU
      gpu: string; // Chip đồ họa GPU
      ram: string; // RAM
      storage_capacity: string; // Dung lượng lưu trữ
      remaining_capacity: string; // Dung lượng khả dụng
    };
    
    battery_and_charging: {
      battery_capacity: string; // Dung lượng pin
      battery_type: string; // Loại pin
      max_charging_support: string; // Hỗ trợ sạc tối đa
      battery_technology: string[]; // Công nghệ pin
    };
    
    connectivity: {
      call_support: string; // Thực hiện cuộc gọi
      wifi: string[]; // WIFI
      gps: string[]; // GPS
      bluetooth: string; // Bluetooth
      charging_connection_port: string; // Cổng kết nối/sạc
      headphone_jack: string; // Jack tai nghe
    };
    
    features: {
      special_features: string[]; // Tính năng đặc biệt
      audio: string[]; // Âm thanh
      voice_recording: boolean; // Ghi âm
      external_keyboard_support: boolean; // Kết nối bàn phím rời
      stylus_support: string; // Hỗ trợ bút cảm ứng
    };
    
    design_and_material: {
      material: string; // Chất liệu
      dimensions_and_weight: string; // Kích thước và khối lượng
      release_date: string; // Thời điểm ra mắt
      brand: string; // Hãng
    };
  }
  