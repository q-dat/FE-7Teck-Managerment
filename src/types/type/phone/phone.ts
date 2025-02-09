import { IPhoneCatalog } from '../phone-catalog/phone-catalog';

export interface IPhone {
  _id: string;
  phone_catalog_id: IPhoneCatalog;
  view?: number;
  name: string;
  color: string;
  img: string;
  thumbnail?: string[];
  price: number;
  sale: number; // ?
  status: string;
  des?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}
