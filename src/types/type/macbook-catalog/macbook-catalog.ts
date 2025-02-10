export interface IMacbookCatalog {
  _id: string;
  m_cat_name: string;
  m_cat_img: string;
  m_cat_price: number;
  m_cat_status: number; // 0 NEW - 1 OLD
  m_cat_content?: string; // Thông tin sản phẩm
  m_cat_macbookCount: number;
  createdAt: string;
  updatedAt: string;

  m_cat_processor: {
    // Bộ xử lý
    m_cat_cpu_technology: string; // Công nghệ CPU
    m_cat_core_count: string; // Số nhân
    m_cat_thread_count: string; // Số luồng
    m_cat_cpu_speed: string; // Tốc độ CPU
    m_cat_max_speed: string; // Tốc độ tối đa
  };
  m_cat_memory_and_storage: {
    // Bộ nhớ RAM, Ổ cứng
    m_cat_ram: string; // RAM
    m_cat_ram_type: string; // Loại RAM
    m_cat_ram_bus_speed: string; // Tốc độ Bus RAM
    m_cat_max_ram_support: string; // Hỗ trợ RAM tối đa
    m_cat_hard_drive: string[]; // Ổ cứng
  };
  m_cat_display: {
    // Màn hình
    m_cat_screen_size: string; // Màn hình
    m_cat_resolution: string; // Độ phân giải
    m_cat_refresh_rate: string; // Tần số quét
    m_cat_color_coverage: string; // Độ phủ màu
    m_cat_screen_technology: string[]; // Công nghệ màn hình
  };
  m_cat_graphics_and_audio: {
    // Đồ hoạ và Âm thanh
    m_cat_gpu: string; // Card màn hình
    m_cat_audio_technology: string; // Công nghệ âm thanh
  };
  m_cat_connectivity_and_ports: {
    // Cổng kết nối & Tính năng mở rộng
    m_cat_ports: string[]; // Cổng giao tiếp
    m_cat_wireless_connectivity: string[]; // Kết nối không dây
    m_cat_card_reader: string; // Khe đọc thẻ nhớ
    m_cat_webcam: string; // Webcam
    m_cat_other_features: string[]; // Tính năng khác
    m_cat_keyboard_backlight: string; // Đèn bàn phím
  };
  m_cat_dimensions_weight_battery: {
    // Kích thước - Khối lượng - Pin
    m_cat_dimensions: string[]; //  Kích thước
    m_cat_material: string; // Chất liệu
    m_cat_battery_info: string; // Thông tin Pin
    m_cat_operating_system: string; // Hệ điều hành
    m_cat_release_date: string; // Thời điểm ra mắt
  };
}

