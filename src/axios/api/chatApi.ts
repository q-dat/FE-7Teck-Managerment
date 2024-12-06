import axios from '../../config/axiosConfig';
import { IMessage } from '../../types/type/chat/chat';

// Get All
export const fetchMessagesApi = () => {
  return axios.get<{ chatMessages: IMessage[] }>('/api/chats');
};

//Post
export const sendMessageApi = async (chatMessage: IMessage) => {
  return await axios.post('/api/chat', chatMessage);
};

