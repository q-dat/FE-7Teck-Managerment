import { AxiosResponse } from 'axios';
import axios from '../config/axiosConfig';
import { CloudinaryImageApiResponse, CloudinaryImageQueryParams } from '../../types/type/cloudinary/cloudinary-image';

const buildCloudinaryImageQuery = (params?: CloudinaryImageQueryParams): string => {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  if (params.folder) {
    searchParams.set('folder', params.folder);
  }

  if (params.keyword) {
    searchParams.set('keyword', params.keyword);
  }

  if (params.maxResults !== undefined) {
    searchParams.set('maxResults', String(params.maxResults));
  }

  if (params.nextCursor) {
    searchParams.set('nextCursor', params.nextCursor);
  }

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : '';
};

export const getCloudinaryImagesApi = (
  params?: CloudinaryImageQueryParams
): Promise<AxiosResponse<CloudinaryImageApiResponse>> => {
  return axios.get<CloudinaryImageApiResponse>(`/api/cloudinary/images${buildCloudinaryImageQuery(params)}`);
};

export const deleteCloudinaryImagesApi = (urls: string[]): Promise<AxiosResponse<CloudinaryImageApiResponse>> => {
  return axios.delete<CloudinaryImageApiResponse>('/api/cloudinary/images', {
    data: {
      urls
    }
  });
};
