import { ICreatePriceListPayload, IPriceListApi, IProductVariant } from '../../types/type/price-list/price-list';
import axios from '../config/axiosConfig';

// Get All PriceLists
export const getAllPriceListsApi = () => {
  return axios.get<{ priceLists: IProductVariant[] }>('/api/price-lists');
};

// Get PriceList By ID
export const getPriceListByIdApi = (_id: string) => {
  return axios.get<{ priceList: IProductVariant }>(`/api/price-list/${_id}`);
};

// Create PriceList
export const createPriceListApi = (data: any) => {
  return axios.post('/api/price-list', data);
};

// Update PriceList
export const updatePriceListApi = (_id: string, priceListData: ICreatePriceListPayload) => {
  return axios.put<{ priceList: IPriceListApi }>(`/api/price-list/${_id}`, priceListData);
};

// Delete PriceList
export const deletePriceListApi = (id: string) => {
  return axios.delete(`/api/price-list/${id}`);
};
