import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://be-7teck-ecommerce.onrender.com', // Proxy cho API
      '/socket.io': {
        target: 'https://be-7teck-ecommerce.onrender.com', // Đảm bảo WebSocket được xử lý
        ws: true, // Bật hỗ trợ WebSocket
        changeOrigin: true // Thay đổi Origin của request để phù hợp với backend
      }
    }
  }
});
