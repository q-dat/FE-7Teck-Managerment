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
  tabletCatalog?: IPriceListCatalog[];
  macbookCatalog?: IPriceListCatalog[];
  windowsCatalog?: IPriceListCatalog[];
  //
  phoneProducts?: Record<string, IProductPriceList[]>;
  tabletProducts?: Record<string, IProductPriceList[]>;
  macbookProducts?: Record<string, IProductPriceList[]>;
  windowsProducts?: Record<string, IProductPriceList[]>;
}

