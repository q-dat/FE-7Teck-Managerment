import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';

const LoginPage: React.FC = () => {
  const { loginUser, registerUser, error, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      await registerUser({ username, email, password });
    } else {
      await loginUser(email, password);
    }
  };

  return (
    <div>
      <h2>{isRegister ? 'Đăng Ký' : 'Đăng Nhập'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {isRegister ? 'Đăng Ký' : 'Đăng Nhập'}
        </button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Chuyển sang đăng nhập' : 'Chuyển sang đăng ký'}
      </button>
    </div>
  );
};

export default LoginPage;

