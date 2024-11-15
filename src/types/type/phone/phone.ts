export interface IPhone {
  _id: string;
  phone_catalog_id: string;
  name: string; // Tên sản phẩm
  img: string; // Đường dẫn ảnh chính
  thumbnail?: string; // Đường dẫn ảnh thu nhỏ
  des?: string; // Mô tả sản phẩm
  status: string; // Trạng thái sản phẩm
  price: number; // Giá sản phẩm
  createAt: Date; // Thời gian tạo
  updateAt: Date; // Thời gian cập nhật

  // Các thông tin chi tiết khác về sản phẩm
  specs?: {
    os?: string; // Hệ điều hành
    processor?: {
      chipset?: string; // Chipset của sản phẩm
      cpu?: string; // Mô tả chi tiết CPU
      gpu?: string; // GPU của sản phẩm
    };
    memory?: {
      ram?: string; // Dung lượng RAM
      storage?: string; // Bộ nhớ trong
      availableStorage?: string; // Bộ nhớ còn lại
      contactsLimit?: string; // Giới hạn danh bạ
    };
  };

  display?: {
    technology?: string; // Công nghệ màn hình
    resolution?: string; // Độ phân giải
    size?: string; // Kích thước màn hình
    refreshRate?: string; // Tần số làm mới màn hình
    maxBrightness?: string; // Độ sáng tối đa
    glassType?: string; // Loại kính bảo vệ màn hình
  };

  battery?: {
    capacity?: string; // Dung lượng pin
    type?: string; // Loại pin
    fastChargingSupport?: string; // Hỗ trợ sạc nhanh
    features?: string[]; // Các tính năng pin
  };

  camera?: {
    rear?: {
      resolution?: string; // Độ phân giải camera sau
      videoRecording?: { resolution: string; frameRate: string }[]; // Các chế độ quay video
      flash?: string; // Loại đèn flash
      features?: string[]; // Các tính năng của camera sau
    };
    front?: {
      resolution?: string; // Độ phân giải camera trước
      features?: string[]; // Các tính năng của camera trước
    };
  };

  security?: {
    faceUnlock?: string; // Tính năng nhận diện khuôn mặt
  };

  specialFeatures?: string[]; // Các tính năng đặc biệt của sản phẩm
  media?: {
    recording?: string; // Chức năng ghi âm
    videoPlayback?: string; // Định dạng video playback
    audioPlayback?: string[]; // Các định dạng âm thanh hỗ trợ
  };

  connectivity?: {
    network?: {
      cellular?: string; // Hỗ trợ mạng di động
      sim?: string; // Loại SIM
    };
    wifi?: string[]; // Các tính năng Wi-Fi hỗ trợ
    gps?: string[]; // Các hệ thống GPS hỗ trợ
    bluetooth?: {
      version?: string; // Phiên bản Bluetooth
      features?: string[]; // Các tính năng Bluetooth
    };
    ports?: {
      chargingPort?: string; // Cổng sạc
      headphoneJack?: string; // Cổng tai nghe
    };
    otherConnections?: string[]; // Các kết nối khác
  };

  design?: {
    type?: string; // Kiểu thiết kế
    materials?: string[]; // Vật liệu làm sản phẩm
    dimensions?: {
      length?: string; // Chiều dài
      width?: string; // Chiều rộng
      thickness?: string; // Độ dày
      weight?: string; // Trọng lượng
    };
  };
}
