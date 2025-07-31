import axios from '../config/axiosConfig';
import { IPhoneCatalog } from '../../types/type/phone-catalog/phone-catalog';

export const getAllPhoneCatalogsApi = () => {
  return axios.get<{ phoneCatalogs: IPhoneCatalog[] }>('/api/phone-catalogs');
};

// Get PhoneCatalog By ID
export const getPhoneCatalogByIdApi = (_id: string) => {
  return axios.get<{ phoneCatalog: IPhoneCatalog }>(`/api/phone-catalog/${_id}`);
};

// Create PhoneCatalog
export const createPhoneCatalogApi = (formData: FormData) => {
  return axios.post('/api/phone-catalog', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update PhoneCatalog
export const updatePhoneCatalogApi = async (_id: string, phoneCatalogData: FormData) => {
  const response = await axios.put(`/api/phone-catalog/${_id}`, phoneCatalogData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete PhoneCatalog
export const deletePhoneCatalogApi = (id: string) => {
  return axios.delete(`/api/phone-catalog/${id}`);
};
