import axios from '../config/axiosConfig';
import { IPhone } from '../../types/type/phone/phone';

// Get All Phones
export const getAllPhonesApi = () => {
  return axios.get<{ phones: IPhone[] }>('/api/phones');
};

// Get Phone By ID
export const getPhoneByIdApi = (_id: string) => {
  return axios.get<{ phone: IPhone }>(`/api/phone/${_id}`);
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
export const updatePhoneApi = async (_id: string, phoneData: FormData) => {
  const response = await axios.put(`/api/phone/${_id}`, phoneData, {
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

// savePhonesToServer
export const savePhonesToServer = async () => {
  try {
    const { data } = await axios.get('/api/phones');

    // Kiểm tra và đảm bảo dữ liệu không bị lồng
    const formattedData = {
      message: 'Lấy danh sách điện thoại thành công!',
      count: data.phones.length,
      phones: data.phones
    };

    await fetch('/api/phones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData) // Đúng format
    });

    console.log('OK');
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu:', error);
  }
};
savePhonesToServer();
