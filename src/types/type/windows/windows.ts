import { IWindowsCatalog } from "../windows-catalog/windows-catalog";

export interface IWindows {
  _id: string;
  windows_catalog_id: IWindowsCatalog;
  windows_view?: number;
  windows_name: string;
  windows_color: string;
  windows_img: string;
  windows_thumbnail?: string[];
  windows_price: number;
  windows_sale?: number;
  windows_status: string;
  windows_des?: string;
  windows_note?: string;
  createdAt: string;
  updatedAt: string;
}

