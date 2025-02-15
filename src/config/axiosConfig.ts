import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PORT, // URL backend từ .env
  withCredentials: true, // Gửi cookies (quan trọng cho CSRF)
  timeout: 10000
});

// Hàm lấy CSRF token
async function getCsrfToken() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_PORT}/csrf-token`, {
      withCredentials: true
    });
    return response.data.csrfToken;
  } catch (error) {
    console.error('Lỗi lấy CSRF token:', error);
    return null;
  }
}

// Interceptor để tự động thêm CSRF token vào mỗi request
axiosInstance.interceptors.request.use(async (config) => {
  const csrfToken = await getCsrfToken();
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
