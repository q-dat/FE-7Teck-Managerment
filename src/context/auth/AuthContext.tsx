import { createContext, useState, ReactNode, useCallback } from 'react';
import { registerApi, loginApi } from '../../axios/api/authApi';
import { AxiosResponse } from 'axios';

interface AuthContextType {
  user: {
    id: string;
    username: string;
    role: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  registerUser: (userData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

const defaultContextValue: AuthContextType = {
  user: null,
  token: null,
  loading: false,
  error: null,
  registerUser: async () => {},
  loginUser: async () => {},
  logoutUser: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('jwt_token')
  );
  const [user, setUser] = useState<AuthContextType['user']>(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Có lỗi xảy ra!');
  };

  // Đăng ký
  const registerUser = useCallback(
    async (userData: { username: string; email: string; password: string }) => {
      setLoading(true);
      setError(null);
      try {
        await registerApi(userData);
      } catch (err: any) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Đăng nhập
  const loginUser = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<any> = await loginApi(email, password);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('jwt_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Đăng xuất
  const logoutUser = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        registerUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

