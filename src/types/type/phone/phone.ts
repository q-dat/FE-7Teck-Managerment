import { IPhoneCatalog } from '../phone-catalog/phone-catalog';

export interface IPhone {
  _id: string;
  phone_catalog_id: IPhoneCatalog;
  name: string;
  color: string;
  img: string;
  thumbnail?: string[];
  price: number;
  sale: number;
  status: string;
  des?: string;
  createdAt: string;
  updatedAt: string;
}
