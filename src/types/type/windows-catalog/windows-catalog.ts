export interface IWindowsCatalog {
  _id: string;
  w_cat_name: string;
  w_cat_img: string;
  w_cat_price: number;
  w_cat_status: number; // 0 NEW - 1 OLD
  w_cat_content?: string; // Thông tin sản phẩm
  w_cat_windowsCount: number;
  createdAt: string;
  updatedAt: string;

  w_cat_processor: {
    // Bộ xử lý
    w_cat_cpu_technology: string; // Công nghệ CPU
    w_cat_core_count: string; // Số nhân
    w_cat_thread_count: string; // Số luồng
    w_cat_cpu_speed: string; // Tốc độ CPU
    w_cat_max_speed: string; // Tốc độ tối đa
  };
  w_cat_memory_and_storage: {
    // Bộ nhớ RAM, Ổ cứng
    w_cat_ram: string; // RAM
    w_cat_ram_type: string; // Loại RAM
    w_cat_ram_bus_speed: string; // Tốc độ Bus RAM
    w_cat_max_ram_support: string; // Hỗ trợ RAM tối đa
    w_cat_hard_drive: string[]; // Ổ cứng
  };
  w_cat_display: {
    // Màn hình
    w_cat_screen_size: string; // Màn hình
    w_cat_resolution: string; // Độ phân giải
    w_cat_refresh_rate: string; // Tần số quét
    w_cat_color_coverage: string; // Độ phủ màu
    w_cat_screen_technology: string[]; // Công nghệ màn hình
  };
  w_cat_graphics_and_audio: {
    // Đồ hoạ và Âm thanh
    w_cat_gpu: string; // Card màn hình
    w_cat_audio_technology: string; // Công nghệ âm thanh
  };
  w_cat_connectivity_and_ports: {
    // Cổng kết nối & Tính năng mở rộng
    w_cat_ports: string[]; // Cổng giao tiếp
    w_cat_wireless_connectivity: string[]; // Kết nối không dây
    w_cat_card_reader: string; // Khe đọc thẻ nhớ
    w_cat_webcam: string; // Webcam
    w_cat_other_features: string[]; // Tính năng khác
    w_cat_keyboard_backlight: string; // Đèn bàn phím
  };
  w_cat_dimensions_weight_battery: {
    // Kích thước - Khối lượng - Pin
    w_cat_dimensions: string[]; //  Kích thước
    w_cat_material: string; // Chất liệu
    w_cat_battery_info: string; // Thông tin Pin
    w_cat_operating_system: string; // Hệ điều hành
    w_cat_release_date: string; // Thời điểm ra mắt
  };
}

