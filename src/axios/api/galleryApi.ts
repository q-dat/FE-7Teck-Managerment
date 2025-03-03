import axios from '../config/axiosConfig';
import { IGallery } from '../../types/type/gallery/gallery';

// Get All Galleries
export const getAllGallerysApi = () => {
  return axios.get<{ gallerys: IGallery[] }>('/api/galleries');
};
// Get Gallery By ID
export const getGalleryByIdApi = (_id: string) => {
  return axios.get<{ gallery: IGallery }>(`/api/gallery/${_id}`);
};
// Create Gallery
export const createGalleryApi = (formData: FormData) => {
  return axios.post('/api/gallery', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
// Update Gallery
export const updateGalleryApi = async (_id: string, galleryData: FormData) => {
  const response = await axios.put(`/api/gallery/${_id}`, galleryData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
// Delete Gallery
export const deleteGalleryApi = (id: string) => {
  return axios.delete(`/api/gallery/${id}`);
};
