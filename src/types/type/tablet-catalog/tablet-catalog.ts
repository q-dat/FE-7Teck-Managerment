export interface ITabletCatalog {
  _id: string;
  t_cat_name: string;
  t_cat_img: string;
  t_cat_price: number;
  t_cat_status: number; // 0 NEW - 1 OLD
  t_cat_content?: string; // Thông tin sản phẩm
  t_cat_tabletCount: number;
  createdAt: string;
  updatedAt: string;

  t_cat_display: {
    // Màn hình
    t_cat_screen_technology: string; // Công nghệ màn hình
    t_cat_resolution: string; // Độ phân giải
    t_cat_screen_size: string; // Màn hình rộng
  };
  t_cat_operating_system_and_cpu: {
    // Hệ điều hành & CPU
    t_cat_operating_system: string; // Hệ điều hành
    t_cat_cpu_chip: string; // Chip xử lý (CPU)
    t_cat_cpu_speed: string; // Tốc độ CPU
    t_cat_gpu: string; // Chip đồ hoạ (GPU)
  };
  t_cat_memory_and_storage: {
    // Bộ nhớ & Lưu trữ
    t_cat_ram: string; // RAM
    t_cat_storage_capacity: string; // Dung lượng lưu trữ
    t_cat_available_storage: string; // Dung lượng còn lại
  };
  t_cat_rear_camera: {
    // Camera sau
    t_cat_resolution: string; // Độ phân giải
    t_cat_video_recording: string[]; // Quay phim
    t_cat_features: string[]; // Tính năng
  };
  t_cat_front_camera: {
    // Camera trước
    t_cat_resolution: string; // Độ phân giải
    t_cat_features: string[]; // Tính năng
  };
  t_cat_connectivity: {
    // Kết nối
    t_cat_mobile_network: string; // Mạng di động
    t_cat_sim: string; // SIM
    t_cat_calls: string; // Thực hiện cuộc gọi
    t_cat_wifi: string[]; // Wifi
    t_cat_gps: string[]; // GPS
    t_cat_bluetooth: string; // Bluetooth
    t_cat_charging_port: string; // Cổng kết nối/sạc
    t_cat_headphone_jack: string; // Jack tai nghe
  };
  t_cat_features: {
    // Tiện ích
    t_cat_special_features: string[]; // Tính năng đặc biệt
  };
  t_cat_battery_and_charging: {
    // Pin & Sạc
    t_cat_battery_capacity: string; // Dung lượng pin
    t_cat_battery_type: string; // Loại pin
    t_cat_battery_technology: string[]; // Công nghệ pin
    t_cat_max_charging_support: string; // Hỗ trợ sạc tối đa
    t_cat_included_charger: string; // Sạc kèm theo máy
  };
  t_cat_general_information: {
    // Thông tin chung
    t_cat_material: string; // Chất liệu
    t_cat_dimensions_and_weight: string; //Kích thước và khối lượng
    t_cat_launch_date: string; // Thời điểm ra mắt
    t_cat_brand: string; // Hãng
  };
}
