import { ITabletCatalog } from '../tablet-catalog/tablet-catalog';

export interface ITablet {
  _id: string;
  tablet_catalog_id: ITabletCatalog;
  tablet_view?: number;
  tablet_name: string;
  tablet_color: string;
  tablet_img: string;
  tablet_thumbnail?: string[];
  tablet_price: number;
  tablet_sale: number; // ?
  tablet_status: string;
  tablet_des?: string;
  tablet_note?: string;
  createdAt: string;
  updatedAt: string;
}

