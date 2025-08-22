export interface IProductVariant {
  _id?: string;
  name: string;
  status:string
  condition: string;
  price: number;
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
  status: string[];
  conditions?: string;
  groups: IProductGroup[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreatePriceListPayload {
  category: string;
  status: string[];
  conditions?: string;
  groups: IProductGroup[];
}
export interface FormValues {
  name: string;     
  status: string;   
  price: number;    
  storage?: string; 
  conditions?: string;
}
