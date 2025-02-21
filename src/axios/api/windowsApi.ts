import axios from '../config/axiosConfig';
import { IWindows } from '../../types/type/windows/windows';

// Get All Windows
export const getAllWindowsApi = () => {
  return axios.get<{ windows: IWindows[] }>('/api/laptop-windows');
};

// Get Windows By ID
export const getWindowsByIdApi = (_id: string) => {
  return axios.get<{ windows: IWindows }>(`/api/windows/${_id}`);
};

// Create Windows
export const createWindowsApi = (formData: FormData) => {
  return axios.post('/api/windows', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update Windows
export const updateWindowsApi = async (_id: string, windowsData: FormData) => {
  const response = await axios.put(`/api/windows/${_id}`, windowsData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete Windows
export const deleteWindowsApi = (id: string) => {
  return axios.delete(`/api/windows/${id}`);
};

