import axios from '../config/axiosConfig';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export const registerApi = (userData: { username: string; email: string; password: string }) => {
  return axios.post<{ message: string }>('/api/register', userData);
};

export const loginApi = (email: string, password: string) => {
  return axios.post<AuthResponse>('/api/login', { email, password });
};
