import { createContext, useState, ReactNode, useCallback } from "react";
import { registerApi, loginApi } from "../../axios/api/authApi";
import { AxiosResponse } from "axios";

interface AuthContextType {
  user: {
    id: string;
    username: string;
    role: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  registerUser: (userData: { username: string; email: string; password: string }) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>; // Sửa lại kiểu login
  logoutUser: () => void;
}

const defaultContextValue: AuthContextType = {
  user: null,
  token: null,
  loading: false,
  error: null,
  registerUser: async () => {},
  loginUser: async () => {},
  logoutUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("jwt_token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || "Có lỗi xảy ra!");
  };

  // Đăng ký
  const registerUser = useCallback(async (userData: { username: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      await registerApi(userData);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Đăng nhập (Sử dụng GET thay vì POST)
  const loginUser = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<any> = await loginApi(email, password);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("jwt_token", response.data.token);
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
    localStorage.removeItem("jwt_token");
  }, []);


  return (
    <AuthContext.Provider value={{ user, token, loading, error, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
