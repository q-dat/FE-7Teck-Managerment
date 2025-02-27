import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Input, Button } from 'react-daisyui';
import { bgBlog } from '../../assets/images';

const ErrorPopup = ({ error }: { error: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!error || !isVisible) return null;

  return (
    <div
      onClick={() => setIsVisible(false)}
      className="absolute z-10 cursor-pointer rounded border border-red-500 bg-white p-2 font-light text-red-600 shadow-lg"
      style={{
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="flex items-center gap-2">
        <span>ERROR:{error}&nbsp; ⚠</span>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const { loginUser, registerUser, error, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      await registerUser({ username, email, password });
    } else {
      await loginUser(email, password);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgBlog})`
      }}
      className="fixed inset-0 flex w-full flex-col items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat px-2 xl:px-20"
    >
      <h2 className="mb-5 text-3xl font-bold text-primary transition-all duration-300">
        {isRegister ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập'}
      </h2>

      {/* Form */}
      <div className="relative z-10 w-full rounded-lg border border-gray-300 bg-primary p-6 shadow-lg xl:w-[450px]">
        <form
          className="flex w-full flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          {isRegister && (
            <Input
              className="w-full border-none placeholder:text-black focus:outline-none"
              type="text"
              placeholder="Nhập tên:"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          )}
          <Input
            className="w-full border-none placeholder:text-black focus:outline-none"
            type="email"
            placeholder="Nhập email:"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="relative w-full">
            <Input
              className="w-full border-none placeholder:text-black focus:outline-none"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu:"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              className="absolute inset-y-0 right-2 flex items-center text-xl text-primary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <Button
            size="sm"
            className="z-50 w-[100px] rounded-md bg-white uppercase text-primary transition-all duration-300 hover:bg-primary hover:bg-opacity-70 hover:text-white"
            type="submit"
            loading={loading}
          >
            OK
          </Button>
          {error && <ErrorPopup error={error} />}
        </form>
      </div>
      <button
        className="my-3 font-semibold text-blue-700 underline"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? 'Chuyển sang đăng nhập' : 'Chuyển sang đăng ký'}
      </button>
    </div>
  );
};

export default LoginPage;

