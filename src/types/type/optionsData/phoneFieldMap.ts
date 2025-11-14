export const phoneFieldMap = [
  {
    group: 'configuration_and_memory',
    name: 'Cấu hình và bộ nhớ',
    fields: [
      { field: 'operating_system', name: 'Hệ điều hành' },
      { field: 'cpu_chip', name: 'Chip xử lý CPU' },
      { field: 'cpu_speed', name: 'Tốc độ CPU' },
      { field: 'gpu', name: 'Chip đồ họa GPU' },
      { field: 'ram', name: 'RAM' },
      { field: 'storage_capacity', name: 'Dung lượng lưu trữ' },
      { field: 'remaining_capacity', name: 'Dung lượng khả dụng' },
      { field: 'memory_card', name: 'Thẻ nhớ' },
      { field: 'contacts', name: 'Danh bạ' }
    ]
  },
  {
    group: 'camera_and_screen',
    name: 'Camera và màn hình',
    fields: [
      { field: 'rear_camera_resolution', name: 'Độ phân giải camera sau' },
      { field: 'rear_camera_video', name: 'Quay phim camera sau' },
      { field: 'rear_camera_flash', name: 'Đèn Flash camera sau' },
      { field: 'rear_camera_features', name: 'Tính năng camera sau' },
      { field: 'front_camera_resolution', name: 'Độ phân giải camera trước' },
      { field: 'front_camera_features', name: 'Tính năng camera trước' },
      { field: 'screen_technology', name: 'Công nghệ màn hình' },
      { field: 'screen_resolution', name: 'Độ phân giải màn hình' },
      { field: 'screen_size', name: 'Màn hình rộng' },
      { field: 'max_brightness', name: 'Độ sáng tối đa' },
      { field: 'touchscreen_glass', name: 'Mặt kính cảm ứng' }
    ]
  },
  {
    group: 'battery_and_charging',
    name: 'Pin và sạc',
    fields: [
      { field: 'battery_capacity', name: 'Dung lượng pin' },
      { field: 'battery_type', name: 'Loại pin' },
      { field: 'max_charging_support', name: 'Hỗ trợ sạc tối đa' },
      { field: 'battery_technology', name: 'Công nghệ pin' }
    ]
  },
  {
    group: 'features',
    name: 'Tiện ích',
    fields: [
      { field: 'advanced_security', name: 'Bảo mật nâng cao' },
      { field: 'special_features', name: 'Tính năng đặc biệt' },
      { field: 'water_dust_resistant', name: 'Kháng nước/bụi' },
      { field: 'voice_recording', name: 'Ghi âm' },
      { field: 'radio', name: 'Radio' },
      { field: 'video_playback', name: 'Xem phim' },
      { field: 'music_playback', name: 'Nghe nhạc' }
    ]
  },
  {
    group: 'connectivity',
    name: 'Kết nối',
    fields: [
      { field: 'mobile_network', name: 'Mạng di động' },
      { field: 'sim', name: 'Sim' },
      { field: 'wifi', name: 'WIFI' },
      { field: 'gps', name: 'GPS' },
      { field: 'bluetooth', name: 'Bluetooth' },
      { field: 'charging_connection_port', name: 'Cổng kết nối/sạc' },
      { field: 'headphone_jack', name: 'Jack tai nghe' },
      { field: 'other_connectivity', name: 'Kết nối khác' }
    ]
  },
  {
    group: 'design_and_material',
    name: 'Thiết kế và chất liệu',
    fields: [
      { field: 'design', name: 'Thiết kế' },
      { field: 'material', name: 'Chất liệu' },
      { field: 'dimensions_and_weight', name: 'Kích thước và khối lượng' },
      { field: 'release_date', name: 'Thời điểm ra mắt' },
      { field: 'brand', name: 'Hãng' }
    ]
  }
];