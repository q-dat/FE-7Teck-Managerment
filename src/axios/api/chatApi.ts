import axios from '../../config/axiosConfig';
import { IMessage } from '../../types/type/chat/chat';

// Hàm fetch tin nhắn
export const fetchMessagesApi = async (): Promise<IMessage[]> => {
  try {
    const response = await axios.get<IMessage[]>('/api/chats');
    return response.data;
  } catch (error) {
    console.error('Không thể tải tin nhắn:', error);
    throw error;
  }
};

// Hàm gửi tin nhắn
export const sendMessageApi = async (
  content: string,
  sender: 'user' | 'admin'
): Promise<IMessage> => {
  try {
    const newMessage = { content, sender };
    const response = await axios.post<IMessage>('/api/chat', newMessage);
    return response.data;
  } catch (error) {
    console.error('Không thể gửi tin nhắn:', error);
    throw error;
  }
};
