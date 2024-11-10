import axios from '../../config/axiosConfig';
import { IProduct } from '../../types/type/product/product';

// Get All Products
export const getAllProductsApi = () => {
  return axios.get<{ products: IProduct[] }>('/api/products');
};

// Get Product By ID
export const getProductByIdApi = (_id: string) => {
  return axios.get<{ product: IProduct }>(`/api/product/${_id}`);
};

// Create Product
export const createProductApi = (formData: FormData) => {
  return axios.post('/api/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update Product
export const updateProductApi = async (_id: string, productData: FormData) => {
  const response = await axios.put(`/api/product/${_id}`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete Product
export const deleteProductApi = (id: string) => {
  return axios.delete(`/api/product/${id}`);
};
