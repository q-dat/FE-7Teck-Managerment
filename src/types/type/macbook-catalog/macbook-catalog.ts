export interface IMacbookCatalog {
    _id: string;
    name: string;
    img: string;
    price: number;
    status: number; // 0 NEW - 1 OLD
    content?: string; // Thông tin sản phẩm
    macbookCount: number;
    createdAt: string;
    updatedAt: string;
  
    processor: {
      cpu_technology: string; // Công nghệ CPU
      cores: number; // Số nhân
      threads: string; // Số luồng
      cpu_speed: string; // Tốc độ CPU
      max_speed: string; // Tốc độ tối đa
    };
  
    memory_and_storage: {
      ram: string; // RAM
      ram_type: string; // Loại RAM
      ram_bus_speed: string; // Tốc độ Bus RAM
      max_ram_support: string; // Hỗ trợ RAM tối đa
      storage: string; // Ổ cứng
    };
  
    display: {
      screen_size: string; // Màn hình
      resolution: string; // Độ phân giải
      refresh_rate: string; // Tần số quét
      screen_technology: string[]; // Công nghệ màn hình
    };
  
    graphics_and_audio: {
      gpu: string; // Card màn hình
      audio_technology: string[]; // Công nghệ âm thanh
    };
  
    connectivity_and_ports: {
      ports: string[]; // Cổng giao tiếp
      wireless_connectivity: string[]; // Kết nối không dây
      webcam: string; // Webcam
      other_features: string[]; // Tính năng khác
    };
  
    dimensions_and_battery: {
      dimensions: string; // Kích thước
      material: string; // Chất liệu
      battery_life: string; // Thông tin Pin
    };
  
    general_info: {
      operating_system: string; // Hệ điều hành
      release_date: string; // Thời điểm ra mắt
    };
  }
  