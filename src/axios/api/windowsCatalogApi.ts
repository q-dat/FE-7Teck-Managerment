import axios from '../../config/axiosConfig';
import { IWindowsCatalog } from '../../types/type/windows-catalog/windows-catalog';

export const getAllWindowsCatalogsApi = () => {
  return axios.get<{ windowsCatalogs: IWindowsCatalog[] }>(
    '/api/windows-catalogs'
  );
};

// Get WindowsCatalog By ID
export const getWindowsCatalogByIdApi = (_id: string) => {
  return axios.get<{ windowsCatalog: IWindowsCatalog }>(
    `/api/windows-catalog/${_id}`
  );
};

// Create WindowsCatalog
export const createWindowsCatalogApi = (formData: FormData) => {
  return axios.post('/api/windows-catalog', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update WindowsCatalog
export const updateWindowsCatalogApi = async (
  _id: string,
  windowsCatalogData: FormData
) => {
  const response = await axios.put(
    `/api/windows-catalog/${_id}`,
    windowsCatalogData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
};

// Delete WindowsCatalog
export const deleteWindowsCatalogApi = (id: string) => {
  return axios.delete(`/api/windows-catalog/${id}`);
};

