import axios from '../../config/axiosConfig';
import { IPhoneCatalog } from '../../types/type/phone-catalog/phone-catalog';

export const getAllPhoneCatalogsApi = () => {
  return axios.get('/api/phone-catalogs');
};

// Get Phone By ID
export const getPhoneCatalogByIdApi = (_id: string) => {
  return axios.get<{ Phone: IPhoneCatalog }>(`/api/phone-catalog/${_id}`);
};

// Create Phone
export const createPhoneCatalogApi = (formData: FormData) => {
  return axios.post('/api/phone-catalog', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update Phone
export const updatePhoneCatalogApi = async (
  _id: string,
  PhoneData: FormData
) => {
  const response = await axios.put(`/api/phone-catalog/${_id}`, PhoneData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete Phone
export const deletePhoneCatalogApi = (id: string) => {
  return axios.delete(`/api/phone-catalog/${id}`);
};
