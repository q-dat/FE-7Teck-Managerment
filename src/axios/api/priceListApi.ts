import { IPriceList } from '../../types/type/price-list/price-list';
import axios from '../config/axiosConfig';

// Get All PriceLists
export const getAllPriceListsApi = () => {
  return axios.get<{ priceLists: IPriceList[] }>('/api/price-lists');
};

// Get PriceList By ID
export const getPriceListByIdApi = (_id: string) => {
  return axios.get<{ priceList: IPriceList }>(`/api/price-list/${_id}`);
};

// Create PriceList
export const createPriceListApi = (data: any) => {
  return axios.post('/api/price-list', data);
};

// Update PriceList
export const updatePriceListApi = async (
  _id: string,
  priceListData: FormData
) => {
  const response = await axios.put(`/api/price-list/${_id}`, priceListData);
  return response.data;
};

// Delete PriceList
export const deletePriceListApi = (id: string) => {
  return axios.delete(`/api/price-list/${id}`);
};
