import { AxiosResponse } from 'axios';
import axios from '../config/axiosConfig';
import { PostApiResponse, PostQueryParams } from '../../types/type/post/post';

const buildPostQuery = (params?: PostQueryParams): string => {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  if (params.catalogId !== undefined) {
    searchParams.set('catalogId', String(params.catalogId));
  }

  if (params.catalog) {
    searchParams.set('catalog', params.catalog);
  }

  if (params.slug) {
    searchParams.set('slug', params.slug);
  }

  if (params.keyword) {
    searchParams.set('keyword', params.keyword);
  }

  if (params.page !== undefined) {
    searchParams.set('page', String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set('limit', String(params.limit));
  }

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : '';
};

// Get All Posts
export const getAllPostsApi = (params?: PostQueryParams): Promise<AxiosResponse<PostApiResponse>> => {
  return axios.get<PostApiResponse>(`/api/posts${buildPostQuery(params)}`);
};

// Get Post By ID
export const getPostByIdApi = (_id: string): Promise<AxiosResponse<PostApiResponse>> => {
  return axios.get<PostApiResponse>(`/api/post/${_id}`);
};

// Get Post By Slug
export const getPostBySlugApi = (slug: string): Promise<AxiosResponse<PostApiResponse>> => {
  return axios.get<PostApiResponse>(`/api/post/slug/${slug}`);
};

// Get Related Posts
export const getRelatedPostsApi = (id: string, limit = 6): Promise<AxiosResponse<PostApiResponse>> => {
  return axios.get<PostApiResponse>(`/api/posts/related/${id}?limit=${limit}`);
};

// Create Post
export const createPostApi = (formData: FormData): Promise<AxiosResponse<PostApiResponse>> => {
  return axios.post<PostApiResponse>('/api/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update Post
export const updatePostApi = (_id: string, postData: FormData): Promise<AxiosResponse<PostApiResponse>> => {
  return axios.put<PostApiResponse>(`/api/post/${_id}`, postData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Delete Post
export const deletePostApi = (id: string): Promise<AxiosResponse<PostApiResponse>> => {
  return axios.delete<PostApiResponse>(`/api/post/${id}`);
};
