import { createContext, useState, ReactNode, useCallback } from 'react';
import { registerApi, loginApi } from '../../axios/api/authApi';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

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
  //
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('jwt_token')
  );
  //
  const [user, setUser] = useState<AuthContextType['user']>(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;

    try {
      const encodedUser = JSON.parse(storedUser); // Đọc dữ liệu mã hóa từ localStorage
      return {
        id: encodedUser.id,
        username: atob(encodedUser.username), // Giải mã Base64
        role: atob(encodedUser.role) // Giải mã Base64
      };
    } catch (error) {
      console.error('Lỗi giải mã user:', error);
      return null;
    }
  });
  //
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      const encodedUserData = response.data.user; // Nhận dữ liệu đã mã hóa từ server

      // Lưu dữ liệu mã hóa vào localStorage
      localStorage.setItem('jwt_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(encodedUserData));

      // Giải mã để sử dụng trong ứng dụng
      const userData = {
        id: encodedUserData.id,
        username: atob(encodedUserData.username),
        role: atob(encodedUserData.role)
      };

      setToken(response.data.token);
      setUser(userData);

      if (userData.role === 'admin') {
        navigate('/cms/admin/');
      } else {
        navigate('/');
      }
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
