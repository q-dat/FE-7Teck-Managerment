import { IMacbookCatalog } from '../macbook-catalog/macbook-catalog';

export interface IMacbook {
  _id: string;
  macbook_catalog_id: IMacbookCatalog;
  macbook_view?: number;
  macbook_name: string;
  macbook_color: string;
  macbook_img: string;
  macbook_thumbnail?: string[];
  macbook_price: number;
  macbook_sale: number; // ?
  macbook_status: string;
  macbook_des?: string;
  macbook_note?: string;
  createdAt: string;
  updatedAt: string;
}

