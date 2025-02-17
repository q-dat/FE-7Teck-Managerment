import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PORT, // URL backend từ .env
  withCredentials: true, // Gửi cookies (quan trọng cho CSRF)
  timeout: 10000
});

// let csrfTokenCache: string | null = null;
// let sessionTokenCache: string = localStorage.getItem('sessionToken') || '';
// let isFetchingToken = false; // 🛑 Tránh gọi nhiều request cùng lúc
// let tokenPromise: Promise<{
//   csrfToken: string | null;
//   sessionToken: string;
// }> | null = null;

// // Hàm lấy CSRF token & session token
// async function getTokens() {
//   if (csrfTokenCache && sessionTokenCache)
//     return { csrfToken: csrfTokenCache, sessionToken: sessionTokenCache };

//   if (isFetchingToken && tokenPromise) {
//     return tokenPromise; // 🛑 Nếu đã có request đang chạy, chờ nó xong
//   }

//   isFetchingToken = true;
//   tokenPromise = axios
//     .get(`${import.meta.env.VITE_API_PORT}/csrf-token`, {
//       withCredentials: true
//     })
//     .then(response => {
//       csrfTokenCache = response.data.csrfToken;
//       sessionTokenCache = response.data.sessionToken || '';
//       localStorage.setItem('sessionToken', sessionTokenCache);
//       return { csrfToken: csrfTokenCache, sessionToken: sessionTokenCache };
//     })
//     .catch(error => {
//       console.error('❌ Lỗi lấy token:', error);
//       return { csrfToken: null, sessionToken: '' };
//     })
//     .finally(() => {
//       isFetchingToken = false;
//       tokenPromise = null;
//     });

//   return tokenPromise;
// }

// // Interceptor để thêm token vào mỗi request
// axiosInstance.interceptors.request.use(
//   async config => {
//     const method = config.method?.toLowerCase();

//     if (!csrfTokenCache || !sessionTokenCache) {
//       const tokens = await getTokens();
//       csrfTokenCache = tokens.csrfToken;
//       sessionTokenCache = tokens.sessionToken;
//     }

//     if (sessionTokenCache) {
//       config.headers = config.headers || {};
//       config.headers['Authorization'] = `Bearer ${sessionTokenCache}`;
//     }

//     if (
//       method &&
//       ['post', 'put', 'patch', 'delete'].includes(method) &&
//       csrfTokenCache
//     ) {
//       config.headers['X-CSRF-Token'] = csrfTokenCache;
//     }

//     config.withCredentials = true; // 🔥 Quan trọng: Luôn gửi cookie theo request

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// export function clearSessionToken() {
//   localStorage.removeItem('sessionToken');
//   sessionTokenCache = '';
//   csrfTokenCache = null; // Xóa CSRF token luôn
// }

// Hàm lấy clientId từ FingerprintJS
const getFingerprint = async (): Promise<string> => {
  const fp = await FingerprintJS.load(); // Tải FingerprintJS
  const result = await fp.get(); // Lấy thông tin về client
  return result.visitorId; // Trả về clientId duy nhất
};

// Cấu hình Interceptor để thêm clientId vào tất cả request
axiosInstance.interceptors.request.use(
  async config => {
    const clientId = await getFingerprint(); // Lấy clientId từ FingerprintJS
    if (clientId) {
      config.headers['X-Client-ID'] = clientId; // Gửi clientId trong header của request
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
