import { IPriceListCatalog } from '../price-list-catalog/price-list-catalog';

export interface IProductPriceList {
  _id: string;
  name?: string;
  price?: string;
  storage?: string;
}

export interface IPriceList {
  _id: string;
  phoneCatalog?: IPriceListCatalog[];
  ipadCatalog?: IPriceListCatalog[];
  laptopCatalog?: IPriceListCatalog[];
  //
  phoneProducts?: Record<string, IProductPriceList[]>;
  ipadProducts?: Record<string, IProductPriceList[]>;
  laptopProducts?: Record<string, IProductPriceList[]>;
}
