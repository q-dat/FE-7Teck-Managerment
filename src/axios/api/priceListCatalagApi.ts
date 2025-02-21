import { IPriceListCatalog } from '../../types/type/price-list-catalog/price-list-catalog';
import axios from '../config/axiosConfig';

// Get All PriceListCatalogs
export const getAllPriceListCatalogsApi = () => {
  return axios.get<{ pricelistCatalog: IPriceListCatalog[] }>(
    '/api/price-list-catalogs'
  );
};

// Get PriceListCatalog By ID
export const getPriceListCatalogByIdApi = (_id: string) => {
  return axios.get<{ pricelistCatalog: IPriceListCatalog }>(
    `/api/price-list-catalog/${_id}`
  );
};

// Create PriceListCatalog
export const createPriceListCatalogApi = (formData: FormData) => {
  return axios.post('/api/price-list-catalog', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update PriceListCatalog
export const updatePriceListCatalogApi = async (
  _id: string,
  pricelistCatalogData: FormData
) => {
  const response = await axios.put(
    `/api/price-list-catalog/${_id}`,
    pricelistCatalogData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
};

// Delete PriceListCatalog
export const deletePriceListCatalogApi = (id: string) => {
  return axios.delete(`/api/price-list-catalog/${id}`);
};
