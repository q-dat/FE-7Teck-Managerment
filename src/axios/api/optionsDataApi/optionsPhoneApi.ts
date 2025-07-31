import axios from '../../config/axiosConfig';
import { IOptionPhoneData } from '../../../types/type/optionsData/optionsPhoneData';

// Get All OptionsPhones
export const getAllOptionPhonesApi = () => {
  return axios.get<{ ottpionsPhones: IOptionPhoneData[] }>('/api/options-phones');
};

// Get OptionPhone By ID
export const getOptionPhoneByIdApi = (_id: string) => {
  return axios.get<{ ottpionsPhone: IOptionPhoneData }>(`/api/options-phone/${_id}`);
};

// Create OptionPhone
export const createOptionPhoneApi = (formData: FormData) => {
  return axios.post('/api/options-phone', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update OptionPhone
export const updateOptionPhoneApi = async (_id: string, ottpionsPhoneData: FormData) => {
  const response = await axios.put(`/api/options-phone/${_id}`, ottpionsPhoneData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete OptionPhone
export const deleteOptionPhoneApi = (id: string) => {
  return axios.delete(`/api/options-phone/${id}`);
};
