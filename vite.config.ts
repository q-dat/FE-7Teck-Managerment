import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:6001', // Proxy cho API
      '/socket.io': {
        target: 'http://localhost:6001', // Đảm bảo WebSocket được xử lý
        ws: true, // Bật hỗ trợ WebSocket
        changeOrigin: true // Thay đổi Origin của request để phù hợp với backend
      }
    }
  }
});
