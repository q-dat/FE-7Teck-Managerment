import axios from '../config/axiosConfig';
import { IPostCatalog } from '../../types/type/post-catalog/post-catalog';

// Get All PostCatalog
export const getAllPostCatalogsApi = () => {
  return axios.get<{ postCatalogs: IPostCatalog[] }>('/api/post-catalogs');
};

// Get PostCatalog By ID
export const getPostCatalogByIdApi = (id: string) => {
  return axios.get<{ postCatalog: IPostCatalog }>(`/api/post-catalog/${id}`);
};

// Post PostCatalog
export const createPostCatalogApi = (postCatalog: IPostCatalog) => {
  return axios.post<{ postCatalog: IPostCatalog }>(
    '/api/post-catalog',
    postCatalog
  );
};

// Put PostCatalog
export const updatePostCatalogApi = (id: string, postCatalog: IPostCatalog) => {
  return axios.put<{ postCatalog: IPostCatalog }>(
    `/api/post-catalog/${id}`,
    postCatalog
  );
};

// Delete PostCatalog
export const deletePostCatalogApi = (id: string) => {
  return axios.delete(`/api/post-catalog/${id}`);
};
