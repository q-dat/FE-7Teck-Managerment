import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PORT, // URL backend từ .env
  withCredentials: true, // Bật gửi thông tin xác thực
  timeout: 10000
});

export default axiosInstance;
