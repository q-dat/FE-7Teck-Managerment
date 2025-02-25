export interface IProductPriceList {
  _id: string;
  name: string;
  price: number;
  storage: string;
}
export interface IPriceList {
  _id: string;
  phoneProducts: Record<string, IProductPriceList[]>;
  tabletProducts: Record<string, IProductPriceList[]>;
  macbookProducts: Record<string, IProductPriceList[]>;
  windowsProducts: Record<string, IProductPriceList[]>;
}
