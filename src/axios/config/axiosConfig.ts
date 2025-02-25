import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PORT, 
  withCredentials: true,
  // timeout: 10000
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

// ----------------------------------------------------------------

// // Tạo session ID mới nếu chưa có
// const sessionId = sessionStorage.getItem('sessionID') || generateSessionId();
// sessionStorage.setItem('sessionID', sessionId);

// // Hàm tạo session ID (có thể dùng UUID hoặc bất kỳ cách nào khác)
// function generateSessionId() {
//   return 'sess-' + Math.random().toString(36).substr(2, 9); // Example simple session ID
// }

// // Tạo interceptor để tự động thêm sessionID vào tất cả các request
// axiosInstance.interceptors.request.use(
//   config => {
//     const sessionId = sessionStorage.getItem('sessionID');
//     if (sessionId) {
//       config.headers['Session-ID'] = sessionId; // Gửi session ID qua header
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );


export default axiosInstance;
