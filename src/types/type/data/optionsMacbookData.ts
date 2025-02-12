export const optionsMacbookData = {
  m_cat_hard_drive: [
    { value: '4K@30fps', label: '4K@30fps' },
    { value: '1080p@60fps', label: '1080p@60fps' }
  ],
  m_cat_screen_technology: [
    { value: 'Auto Focus', label: 'Auto Focus' },
    { value: 'HDR', label: 'HDR' }
  ],
  m_cat_ports: [
    { value: 'Portrait Mode', label: 'Portrait Mode' },
    { value: 'Beauty Mode', label: 'Beauty Mode' }
  ],
  m_cat_wireless_connectivity: [
    { value: 'Fast Charging', label: 'Fast Charging' },
    { value: 'Wireless Charging', label: 'Wireless Charging' }
  ],
  m_cat_other_features: [
    { value: 'Face ID', label: 'Face ID' },
    { value: 'Fingerprint Scanner', label: 'Fingerprint Scanner' }
  ],
  m_cat_dimensions: [
    { value: '5G Support', label: '5G Support' },
    { value: 'Dual SIM', label: 'Dual SIM' }
  ]
};
interface IOption {
  value: string;
  label: string;
}
export interface IOptionMacbookData {
  m_cat_hard_drive: IOption[];
  m_cat_screen_technology: IOption[];
  m_cat_ports: IOption[];
  m_cat_wireless_connectivity: IOption[];
  m_cat_other_features: IOption[];
  m_cat_dimensions: IOption[];
}

