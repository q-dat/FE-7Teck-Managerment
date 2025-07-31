export const windowsFieldMap = [
  {
    group: 'w_cat_processor',
    name: 'Bộ xử lý',
    fields: [
      { field: 'w_cat_cpu_technology', name: 'Công nghệ CPU' },
      { field: 'w_cat_core_count', name: 'Số nhân' },
      { field: 'w_cat_thread_count', name: 'Số luồng' },
      { field: 'w_cat_cpu_speed', name: 'Tốc độ CPU' },
      { field: 'w_cat_max_speed', name: 'Tốc độ tối đa' }
    ]
  },
  {
    group: 'w_cat_memory_and_storage',
    name: 'Bộ nhớ RAM & Ổ cứng',
    fields: [
      { field: 'w_cat_ram', name: 'RAM' },
      { field: 'w_cat_ram_type', name: 'Loại RAM' },
      { field: 'w_cat_ram_bus_speed', name: 'Tốc độ Bus RAM' },
      { field: 'w_cat_max_ram_support', name: 'Hỗ trợ RAM tối đa' },
      { field: 'w_cat_hard_drive', name: 'Ổ cứng' }
    ]
  },
  {
    group: 'w_cat_display',
    name: 'Màn hình',
    fields: [
      { field: 'w_cat_screen_size', name: 'Màn hình' },
      { field: 'w_cat_resolution', name: 'Độ phân giải' },
      { field: 'w_cat_refresh_rate', name: 'Tần số quét' },
      { field: 'w_cat_color_coverage', name: 'Độ phủ màu' },
      { field: 'w_cat_screen_technology', name: 'Công nghệ màn hình' }
    ]
  },
  {
    group: 'w_cat_graphics_and_audio',
    name: 'Đồ hoạ & Âm thanh',
    fields: [
      { field: 'w_cat_gpu', name: 'Card màn hình' },
      { field: 'w_cat_audio_technology', name: 'Công nghệ âm thanh' }
    ]
  },
  {
    group: 'w_cat_connectivity_and_ports',
    name: 'Cổng kết nối & Tính năng mở rộng',
    fields: [
      { field: 'w_cat_ports', name: 'Cổng giao tiếp' },
      { field: 'w_cat_wireless_connectivity', name: 'Kết nối không dây' },
      { field: 'w_cat_card_reader', name: 'Khe đọc thẻ nhớ' },
      { field: 'w_cat_webcam', name: 'Webcam' },
      { field: 'w_cat_other_features', name: 'Tính năng khác' },
      { field: 'w_cat_keyboard_backlight', name: 'Đèn bàn phím' }
    ]
  },
  {
    group: 'w_cat_dimensions_weight_battery',
    name: 'Kích thước - Khối lượng - Pin',
    fields: [
      { field: 'w_cat_dimensions', name: 'Kích thước' },
      { field: 'w_cat_material', name: 'Chất liệu' },
      { field: 'w_cat_battery_info', name: 'Thông tin Pin' },
      { field: 'w_cat_operating_system', name: 'Hệ điều hành' },
      { field: 'w_cat_release_date', name: 'Thời điểm ra mắt' }
    ]
  }
];
