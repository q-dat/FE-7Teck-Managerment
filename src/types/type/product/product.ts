export interface IProduct {
  _id: string;
  product_catalog_id: string;
  name: string;
  img: string;
  thumbnail?: string;
  des: string;
  status:string;
  price: number;
  quantity: number;
  createAt: Date;
  updateAt: Date;
} 