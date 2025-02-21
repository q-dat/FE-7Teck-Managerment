import axios from '../config/axiosConfig';
import { ITablet } from '../../types/type/tablet/tablet';

// Get All Tablets
export const getAllTabletsApi = () => {
  return axios.get<{ tablets: ITablet[] }>('/api/tablets');
};

// Get Tablet By ID
export const getTabletByIdApi = (_id: string) => {
  return axios.get<{ tablet: ITablet }>(`/api/tablet/${_id}`);
};

// Create Tablet
export const createTabletApi = (formData: FormData) => {
  return axios.post('/api/tablet', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update Tablet
export const updateTabletApi = async (_id: string, tabletData: FormData) => {
  const response = await axios.put(`/api/tablet/${_id}`, tabletData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete Tablet
export const deleteTabletApi = (id: string) => {
  return axios.delete(`/api/tablet/${id}`);
};

