import axios from '../config/axiosConfig';
import { ITabletCatalog } from '../../types/type/tablet-catalog/tablet-catalog';

export const getAllTabletCatalogsApi = () => {
  return axios.get<{ tabletCatalogs: ITabletCatalog[] }>('/api/tablet-catalogs');
};

// Get TabletCatalog By ID
export const getTabletCatalogByIdApi = (_id: string) => {
  return axios.get<{ tabletCatalog: ITabletCatalog }>(`/api/tablet-catalog/${_id}`);
};

// Create TabletCatalog
export const createTabletCatalogApi = (formData: FormData) => {
  return axios.post('/api/tablet-catalog', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update TabletCatalog
export const updateTabletCatalogApi = async (_id: string, tabletCatalogData: FormData) => {
  const response = await axios.put(`/api/tablet-catalog/${_id}`, tabletCatalogData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete TabletCatalog
export const deleteTabletCatalogApi = (id: string) => {
  return axios.delete(`/api/tablet-catalog/${id}`);
};
