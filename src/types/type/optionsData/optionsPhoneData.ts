export const optionsPhoneData = {
  rear_camera_video: [
    { value: '4K@30fps', label: '4K@30fps' },
    { value: '1080p@60fps', label: '1080p@60fps' }
  ],
  rear_camera_features: [
    { value: 'Auto Focus', label: 'Auto Focus' },
    { value: 'HDR', label: 'HDR' }
  ],
  front_camera_features: [
    { value: 'Portrait Mode', label: 'Portrait Mode' },
    { value: 'Beauty Mode', label: 'Beauty Mode' }
  ],
  battery_technology: [
    { value: 'Fast Charging', label: 'Fast Charging' },
    { value: 'Wireless Charging', label: 'Wireless Charging' }
  ],
  advanced_security: [
    { value: 'Face ID', label: 'Face ID' },
    { value: 'Fingerprint Scanner', label: 'Fingerprint Scanner' }
  ],
  special_features: [
    { value: '5G Support', label: '5G Support' },
    { value: 'Dual SIM', label: 'Dual SIM' }
  ],
  wifiOptions: [
    { value: 'Wi-Fi 5', label: 'Wi-Fi 5' },
    { value: 'Wi-Fi 6', label: 'Wi-Fi 6' }
  ],
  gpsOptions: [
    { value: 'GPS', label: 'GPS' },
    { value: 'GLONASS', label: 'GLONASS' }
  ],
  voice_recording: [
    { value: 'Stereo Recording', label: 'Stereo Recording' },
    { value: 'Mono Recording', label: 'Mono Recording' }
  ],
  radio: [
    { value: 'FM Radio', label: 'FM Radio' },
    { value: 'AM Radio', label: 'AM Radio' }
  ],
  music_playback: [
    { value: 'MP3', label: 'MP3' },
    { value: 'AAC', label: 'AAC' }
  ]
};
interface IOption {
  value: string;
  label: string;
}
export interface IOptionPhoneData {
  _id: string;
  rear_camera_video: IOption[];
  rear_camera_features: IOption[];
  front_camera_features: IOption[];
  battery_technology: IOption[];
  advanced_security: IOption[];
  special_features: IOption[];
  wifiOptions: IOption[];
  gpsOptions: IOption[];
  voice_recording: IOption[];
  radio: IOption[];
  music_playback: IOption[];
}
