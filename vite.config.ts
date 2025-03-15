import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'save-phones-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/phones') {
            let body = '';
            req.on('data', chunk => (body += chunk));
            req.on('end', () => {
              const filePath = path.resolve(__dirname, 'public/phones.json');
              try {
                const parsedData = JSON.parse(body);

                // Đảm bảo dữ liệu đúng định dạng
                const wrappedData = {
                  message: 'Lấy danh sách điện thoại thành công!',
                  count: parsedData.phones.length, // Tránh bị lồng dữ liệu
                  phones: parsedData.phones
                };

                fs.writeFile(
                  filePath,
                  JSON.stringify(wrappedData, null, 2),
                  'utf8',
                  err => {
                    if (err) {
                      res.setHeader('Content-Type', 'application/json');
                      res.statusCode = 500;
                      res.end(
                        JSON.stringify({
                          message: 'Lỗi khi lưu dữ liệu',
                          error: err
                        })
                      );
                      return;
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'OK' }));
                  }
                );
              } catch (error) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                res.end(
                  JSON.stringify({ message: 'Lỗi khi xử lý dữ liệu', error })
                );
              }
            });
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    proxy: {
      '/api': 'http://api.7teck.vn/',
      '/socket.io': {
        target: 'http://api.7teck.vn/',
        ws: true, // Bật hỗ trợ WebSocket
        changeOrigin: true // Thay đổi Origin của request để phù hợp với backend
      }
    }
  }
});
