export interface IWindowCatalog {
  _id: string;
  name: string;
  img: string;
  price: number;
  status: number; // 0 NEW - 1 OLD
  content?: string; // Thông tin sản phẩm
  windowsCount: number;
  createdAt: string;
  updatedAt: string;

  processor: {
    // Bộ xử lý
    cpu_technology: string; // Công nghệ CPU
    core_count: number; // Số nhân
    thread_count: number; // Số luồng
    cpu_speed: string; // Tốc độ CPU
    max_speed: string; // Tốc độ tối đa
  };
  memory_and_storage: {
    // Bộ nhớ RAM, Ổ cứng
    ram: string; // RAM
    ram_type: string; // Loại RAM
    ram_bus_speed: string; // Tốc độ Bus RAM
    max_ram_support: string; // Hỗ trợ RAM tối đa
    hard_drive: string[]; // Ổ cứng
  };
  display: {
    // Màn hình
    screen_size: string; // Màn hình
    resolution: string; // Độ phân giải
    refresh_rate: string; // Tần số quét
    color_coverage: string; // Độ phủ màu
    screen_technology: string[]; // Công nghệ màn hình
  };
  graphics_and_audio: {
    // Đồ hoạ và Âm thanh
    gpu: string; // Card màn hình
    audio_technology: string; // Công nghệ âm thanh
  };
  connectivity_and_ports: {
    // Cổng kết nối & tính năng mở rộng
    ports: string[]; // Cổng giao tiếp
    wireless_connectivity: string[]; // Kết nối không dây
    card_reader: string; // Khe đọc thẻ nhớ
    webcam: string; // Webcam
    other_features: string[]; // Tính năng khác
    keyboard_backlight: string; // Đèn bàn phím
  };
  dimensions_weight_battery: {
    // Kích thước - Khối lượng - Pin
    dimensions: string[]; //  Kích thước
    material: string; // Chất liệu
    battery_info: string; // Thông tin Pin
    operating_system: string; // Hệ điều hành
    release_date: string; // Thời điểm ra mắt
  };
}

