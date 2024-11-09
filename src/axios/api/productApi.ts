import axios from '../../config/axiosConfig';
import { IProduct } from '../../types/type/product/product';

// Get All Products
export const getAllProductsApi = () => {
  return axios.get<{ products: IProduct[] }>('/api/products');
};

// Get Product By ID
export const getProductByIdApi = (_id: string) => {
  return axios.get<{ product: IProduct }>(`/api/products/${_id}`);
};

// Create Product
export const createProductApi = (formData: FormData) => {
  return axios.post('/api/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update Product
export const updateProductApi = (_id: string, product: IProduct) => {
  return axios.put<{ product: IProduct }>(`/api/products/${_id}`, product);
};

// Delete Product
export const deleteProductApi = (id: string) => {
  return axios.delete(`/api/products/${id}`);
};

