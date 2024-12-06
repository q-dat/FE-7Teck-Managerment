import axios from '../../config/axiosConfig';
import { IChatCatalog } from '../../types/type/chat/chat-catalog';

// Get All
export const getAllChatCatalogsApi = () => {
  return axios.get<{ chatCatalogs: IChatCatalog }>('/api/chat-catalogs');
};
//Get By ID
export const getChatCatalogByIdApi = (_id: string) => {
  return axios.get<{ chatCatalog: IChatCatalog }>(`/api/chat-catalog/${_id}`);
};
// //Post
export const createChatCatalogApi = (chatCatalog: IChatCatalog) => {
  return axios.post<{ chatCatalog: IChatCatalog }>(
    `/api/chat-catalog`,
    chatCatalog
  );
};
//Delete
export const deleteChatCatalogApi = (_id: string) => {
  return axios.delete<{ chatCatalog: IChatCatalog }>(
    `/api/chat-catalog/${_id}`
  );
};