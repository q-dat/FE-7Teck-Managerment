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
      cpu_technology: string; // Công nghệ CPU
      core_count: number; // Số nhân
      thread_count: number; // Số luồng
      cpu_speed: string; // Tốc độ CPU
      max_speed: string; // Tốc độ tối đa
    };
    
    memory_and_storage: {
      ram: string; // Dung lượng RAM
      ram_type: string; // Loại RAM
      ram_bus_speed: string; // Tốc độ Bus RAM
      max_ram_support: string; // Hỗ trợ RAM tối đa
      storage: string; // Ổ cứng
      hdd_expansion: string; // Hỗ trợ khe cắm HDD mở rộng
    };
    
    display: {
      screen_size: string; // Kích thước màn hình
      resolution: string; // Độ phân giải màn hình
      refresh_rate: string; // Tần số quét
      color_coverage: string; // Độ phủ màu
      screen_technology: string[]; // Công nghệ màn hình
    };
    
    graphics_and_audio: {
      gpu: string; // Card màn hình
      audio_technology: string; // Công nghệ âm thanh
    };
    
    connectivity_and_ports: {
      ports: string[]; // Cổng giao tiếp
      wireless: string[]; // Kết nối không dây
      card_reader: string; // Khe đọc thẻ nhớ
      webcam: string; // Webcam
      keyboard_backlight: boolean; // Đèn bàn phím
    };
    
    dimensions_and_battery: {
      dimensions: string; // Kích thước
      material: string; // Chất liệu
      battery_info: string; // Thông tin pin
    };
    
    software: {
      operating_system: string; // Hệ điều hành
      pre_installed_software: string; // Phần mềm cài sẵn
    };
    
    general: {
      release_date: string; // Thời điểm ra mắt
      brand: string; // Hãng
    };
  }
  