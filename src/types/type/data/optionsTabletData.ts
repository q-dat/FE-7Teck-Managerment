export const optionsTabletData = {
    t_cat_video_recording: [
      { value: '4K@30fps', label: '4K@30fps' },
      { value: '1080p@60fps', label: '1080p@60fps' }
    ],
    t_cat_features: [
      { value: 'Auto Focus', label: 'Auto Focus' },
      { value: 'HDR', label: 'HDR' }
    ],
    t_cat_wifi: [
      { value: 'Portrait Mode', label: 'Portrait Mode' },
      { value: 'Beauty Mode', label: 'Beauty Mode' }
    ],
    t_cat_gps: [
      { value: 'Fast Charging', label: 'Fast Charging' },
      { value: 'Wireless Charging', label: 'Wireless Charging' }
    ],
    t_cat_battery_technology: [
      { value: 'Face ID', label: 'Face ID' },
      { value: 'Fingerprint Scanner', label: 'Fingerprint Scanner' }
    ],
  };
  interface IOption {
    value: string;
    label: string;
  }
  export interface IOptionTabletData {
    t_cat_video_recording: IOption[];
    t_cat_features: IOption[];
    t_cat_wifi: IOption[];
    t_cat_gps: IOption[];
    t_cat_battery_technology: IOption[];
  }