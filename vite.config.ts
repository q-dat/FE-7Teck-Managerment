import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://api.7teck.vn',
        changeOrigin: true,
        secure: false
      }, 
      '/socket.io': {
        target: 'http://api.7teck.vn',
        ws: true, // Bật hỗ trợ WebSocket
        changeOrigin: true // Thay đổi Origin của request để phù hợp với backend
      }
    }
  }
});
