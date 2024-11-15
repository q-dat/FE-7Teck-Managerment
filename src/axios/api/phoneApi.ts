import axios from '../../config/axiosConfig';
import { IPhone } from '../../types/type/phone/phone';

// Get All Phones
export const getAllPhonesApi = () => {
  return axios.get<{ Phones: IPhone[] }>('/api/phones');
};

// Get Phone By ID
export const getPhoneByIdApi = (_id: string) => {
  return axios.get<{ Phone: IPhone }>(`/api/phone/${_id}`);
};

// Create Phone
export const createPhoneApi = (formData: FormData) => {
  return axios.post('/api/phone', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update Phone
export const updatePhoneApi = async (_id: string, PhoneData: FormData) => {
  const response = await axios.put(`/api/phone/${_id}`, PhoneData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete Phone
export const deletePhoneApi = (id: string) => {
  return axios.delete(`/api/phone/${id}`);
};
