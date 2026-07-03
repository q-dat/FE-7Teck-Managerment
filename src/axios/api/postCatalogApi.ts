import { AxiosResponse } from 'axios';
import axios from '../config/axiosConfig';
import {
  PostCatalogApiResponse,
  PostCatalogFormValues,
  PostCatalogQueryParams
} from '../../types/type/post-catalog/post-catalog';

const buildPostCatalogQuery = (params?: PostCatalogQueryParams): string => {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  if (params.catalogId !== undefined) {
    searchParams.set('catalogId', String(params.catalogId));
  }

  if (params.keyword) {
    searchParams.set('keyword', params.keyword);
  }

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : '';
};

// Get All PostCatalog
export const getAllPostCatalogsApi = (
  params?: PostCatalogQueryParams
): Promise<AxiosResponse<PostCatalogApiResponse>> => {
  return axios.get<PostCatalogApiResponse>(`/api/post-catalogs${buildPostCatalogQuery(params)}`);
};

// Get PostCatalog By ID
export const getPostCatalogByIdApi = (id: string): Promise<AxiosResponse<PostCatalogApiResponse>> => {
  return axios.get<PostCatalogApiResponse>(`/api/post-catalog/${id}`);
};

// Get PostCatalog By Slug
export const getPostCatalogBySlugApi = (slug: string): Promise<AxiosResponse<PostCatalogApiResponse>> => {
  return axios.get<PostCatalogApiResponse>(`/api/post-catalog/slug/${slug}`);
};

// Create PostCatalog
export const createPostCatalogApi = (
  postCatalog: PostCatalogFormValues
): Promise<AxiosResponse<PostCatalogApiResponse>> => {
  return axios.post<PostCatalogApiResponse>('/api/post-catalog', postCatalog);
};

// Update PostCatalog
export const updatePostCatalogApi = (
  id: string,
  postCatalog: PostCatalogFormValues
): Promise<AxiosResponse<PostCatalogApiResponse>> => {
  return axios.put<PostCatalogApiResponse>(`/api/post-catalog/${id}`, postCatalog);
};

// Delete PostCatalog
export const deletePostCatalogApi = (id: string): Promise<AxiosResponse<PostCatalogApiResponse>> => {
  return axios.delete<PostCatalogApiResponse>(`/api/post-catalog/${id}`);
};
