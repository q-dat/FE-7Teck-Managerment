import axios from '../config/axiosConfig';
import { IMacbook } from '../../types/type/macbook/macbook';

// Get All Macbook
export const getAllMacbookApi = (params?: { macbook_status?: number }) => {
  return axios.get<{ macbook: IMacbook[] }>('/api/laptop-macbook', { params });
};

// Get Macbook By ID
export const getMacbookByIdApi = (_id: string) => {
  return axios.get<{ macbook: IMacbook }>(`/api/macbook/${_id}`);
};

// Create Macbook
export const createMacbookApi = (formData: FormData) => {
  return axios.post('/api/macbook', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update Macbook
export const updateMacbookApi = async (_id: string, macbookData: FormData) => {
  const response = await axios.put(`/api/macbook/${_id}`, macbookData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete Macbook
export const deleteMacbookApi = (id: string) => {
  return axios.delete(`/api/macbook/${id}`);
};

