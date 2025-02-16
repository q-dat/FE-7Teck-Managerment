import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PORT, // URL backend từ .env
  withCredentials: true, // Gửi cookies (quan trọng cho CSRF)
  timeout: 10000
});

let csrfTokenCache: string | null = null;

// Hàm lấy CSRF token
async function getCsrfToken(): Promise<string | null> {
  if (csrfTokenCache) return csrfTokenCache;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_PORT}/csrf-token`, {
      withCredentials: true
    });
    csrfTokenCache = response.data.csrfToken;
    return csrfTokenCache;
    
  } catch (error) {
    console.error('Lỗi lấy CSRF token:', error);
    return null;
  }
}

// Interceptor để tự động thêm CSRF token vào mỗi request
axiosInstance.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase(); // Fix lỗi có thể là undefined
  if (method && ['post', 'put', 'patch', 'delete'].includes(method)) {
    const csrfToken = await getCsrfToken();
    if (csrfToken) {
      config.headers = config.headers || {}; // Đảm bảo headers không bị undefined
      config.headers['X-CSRF-Token'] = csrfToken;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
