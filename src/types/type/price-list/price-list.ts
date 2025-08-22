export interface IProductVariant {
  _id?: string;
  name: string;
  price_new: number | null;
  price_used: number | null;
  condition: string;
  storage?: string;
}

export interface IProductGroup {
  catalog: string;
  variants: IProductVariant[];
}

export interface IPriceListApi {
  _id: string;
  category: string;
  price_new: number | null;
  price_used: number | null;
  conditions?: string;
  groups: IProductGroup[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreatePriceListPayload {
  category: string;
  price_new: number | null;
  price_used: number | null;
  conditions?: string;
  groups: IProductGroup[];
}

export interface FormValues {
  category: string;
  catalog: string;
  conditions: string;
  variants: Array<{
    name: string;
    price_new: number | null;
    price_used: number | null;
    storage?: string;
    condition: string;
  }>;
}