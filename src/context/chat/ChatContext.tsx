import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback
} from 'react';
import io from 'socket.io-client';
import axios from '../../config/axiosConfig';

type Message = {
  _id: string;
  sender: 'user' | 'admin';
  content: string;
  timestamp: string;
};

type ChatContextType = {
  messages: Message[];
  sendMessage: (content: string, sender: 'user' | 'admin') => void;
  fetchMessages: () => void;
};

// Lấy URL từ biến môi trường
const socket = io(import.meta.env.VITE_API_PORT, {
  transports: ['websocket'],
  withCredentials: true
});

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get<Message[]>('/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Không thể tải tin nhắn:', error);
    }
  };

  // Gửi tin nhắn
  const sendMessage = useCallback(
    async (content: string, sender: 'user' | 'admin') => {
      try {
        const newMessage = { content, sender };
        const response = await axios.post<Message>('/api/messages', newMessage);
        socket.emit('send_message', response.data);
      } catch (error) {
        console.error('Không thể gửi tin nhắn:', error);
      }
    },
    []
  );

  useEffect(() => {
    socket.on('new_message', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('new_message');
    };
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Đã kết nối tới máy chủ Socket.IO');
    });

    socket.on('disconnect', () => {
      console.log('Đã ngắt kết nối khỏi máy chủ Socket.IO');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <ChatContext.Provider value={{ messages, sendMessage, fetchMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat phải được sử dụng trong ChatProvider');
  }
  return context;
};

