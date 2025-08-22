export interface IProductVariant {
  _id?: string;
  name: string;
  price_new: number;
  price_used: number;
  condition: string;
  storage?: string;
}

export interface IProductGroup {
  catalog: string;
  variants: IProductVariant[];
}

// API Response
export interface IPriceListApi {
  _id: string;
  category: string;
  price_new: number;
  price_used: number;
  conditions?: string;
  groups: IProductGroup[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreatePriceListPayload {
  category: string;
  price_new: number;
  price_used: number;
  conditions?: string;
  groups: IProductGroup[];
}
export interface FormValues {
  name: string;
  storage?: string;
  price_new: number;
  price_used: number;
  conditions?: string;
}
