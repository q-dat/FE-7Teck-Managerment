import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
const apiPort = 'https://be-7teck-managerment.onrender.com/';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': `${apiPort}`,
      '/socket.io': {
        target: `${apiPort}`,
        ws: true, // Bật hỗ trợ WebSocket
        changeOrigin: true // Thay đổi Origin của request để phù hợp với backend
      }
    }
  }
});
