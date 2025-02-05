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

  display: {
    // Màn hình
    screen_technology: string; // Công nghệ màn hình
    resolution: string; // Độ phân giải
    screen_size: string; // Màn hình rộng
  };
  operating_system_and_cpu: {
    // Hệ điều hành & CPU
    operating_system: string; // Hệ điều hành
    cpu_chip: string; // Chip xử lý (CPU)
    cpu_speed: string; // Tốc độ CPU
    gpu: string; // Chip đồ hoạ (GPU) - Apple GPU 4 nhân
  };
  memory_and_storage: {
    // Bộ nhớ & Lưu trữ
    ram: string; // RAM
    storage_capacity: string; // Dung lượng lưu trữ
    available_storage: string; // Dung lượng còn lại
  };
  rear_camera: {
    // Camera sau
    resolution: string; // Độ phân giải
    video_recording: string[]; // Quay phim
    features: string[]; // Tính năng
  };
  front_camera: {
    // Camera trước
    resolution: string; // Độ phân giải
    features: string[]; // Tính năng
  };
  connectivity: {
    // Kết nối
    mobile_network: string; // Mạng di động
    sim: string; // SIM
    calls: string; // Thực hiện cuộc gọi
    wifi: string[]; // Wifi
    gps: string[]; // GPS
    bluetooth: string; // Bluetooth
    charging_port: string; // Cổng kết nối/sạc
    headphone_jack: string; // Jack tai nghe
  };
  features: {
    // Tiện ích
    special_features: string[]; // Tính năng đặc biệt
  };
  battery_and_charging: {
    // Pin & Sạc
    battery_capacity: string; // Dung lượng pin
    battery_type: string; // Loại pin
    battery_technology: string[]; // Công nghệ pin
    max_charging_support: string; // Hỗ trợ sạc tối đa
    included_charger: string; // Sạc kèm theo máy
  };
  general_information: {
    // Thông tin chung
    material: string; // Chất liệu
    dimensions_and_weight: string; //Kích thước và khối lượng
    launch_date: string; // Thời điểm ra mắt
    brand: string; // Hãng
  };
}

