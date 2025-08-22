import { ICreatePriceListPayload, IPriceListApi } from '../../types/type/price-list/price-list';
import axios from '../config/axiosConfig';

// Get All PriceLists
export const getAllPriceListsApi = () => {
  return axios.get<{ priceLists: IPriceListApi[]; count: number }>('/api/price-lists');
};

// Get PriceList By ID
export const getPriceListByIdApi = (_id: string) => {
  return axios.get<{ priceList: IPriceListApi }>(`/api/price-list/${_id}`);
};

// Create PriceList
export const createPriceListApi = (data: ICreatePriceListPayload) => {
  return axios.post<{ newPriceList: IPriceListApi }>('/api/price-list', data);
};

// Update PriceList
export const updatePriceListApi = (_id: string, priceListData: ICreatePriceListPayload) => {
  return axios.put<{ updatedPriceList: IPriceListApi }>(`/api/price-list/${_id}`, priceListData);
};

// Delete PriceList
export const deletePriceListApi = (id: string) => {
  return axios.delete(`/api/price-list/${id}`);
};