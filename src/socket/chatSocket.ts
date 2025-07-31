import io from 'socket.io-client';

type IMessage = {};
// Khởi tạo socket
const socket = io(import.meta.env.VITE_API_PORT, {
  transports: ['websocket'],
  withCredentials: true
});

// Lắng nghe sự kiện 'new_message'
export const listenToNewMessages = (callback: (message: IMessage) => void): void => {
  socket.on('new_message', callback);
};

// Gửi tin nhắn qua socket
export const emitMessage = (message: IMessage): void => {
  socket.emit('send_message', message);
};

// Kết nối và ngắt kết nối
export const onSocketConnect = (callback: () => void): void => {
  socket.on('connect', callback);
};

export const onSocketDisconnect = (callback: () => void): void => {
  socket.on('disconnect', callback);
};

// Hủy lắng nghe sự kiện
export const offSocketEvents = (): void => {
  socket.off('new_message');
  socket.off('connect');
  socket.off('disconnect');
};
