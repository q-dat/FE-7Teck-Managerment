import axios from '../config/axiosConfig';
import { IMacbookCatalog } from '../../types/type/macbook-catalog/macbook-catalog';

export const getAllMacbookCatalogsApi = () => {
  return axios.get<{ macbookCatalogs: IMacbookCatalog[] }>('/api/macbook-catalogs');
};

// Get MacbookCatalog By ID
export const getMacbookCatalogByIdApi = (_id: string) => {
  return axios.get<{ macbookCatalog: IMacbookCatalog }>(`/api/macbook-catalog/${_id}`);
};

// Create MacbookCatalog
export const createMacbookCatalogApi = (formData: FormData) => {
  return axios.post('/api/macbook-catalog', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update MacbookCatalog
export const updateMacbookCatalogApi = async (_id: string, macbookCatalogData: FormData) => {
  const response = await axios.put(`/api/macbook-catalog/${_id}`, macbookCatalogData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete MacbookCatalog
export const deleteMacbookCatalogApi = (id: string) => {
  return axios.delete(`/api/macbook-catalog/${id}`);
};
