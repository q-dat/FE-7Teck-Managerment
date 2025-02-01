import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': process.env.VITE_API_PORT ?? '', // Proxy cho API
      '/socket.io': {
        target: process.env.VITE_API_PORT ?? '', // Đảm bảo WebSocket được xử lý
        ws: true, // Bật hỗ trợ WebSocket
        changeOrigin: true // Thay đổi Origin của request để phù hợp với backend
      }
    }
  }
});
