import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback
} from 'react';
import {
  listenToNewMessages,
  emitMessage,
  onSocketConnect,
  onSocketDisconnect,
  offSocketEvents
} from '../../socket/chatSocket';
import { IMessage } from '../../types/chat/chat';
import { fetchMessagesApi, sendMessageApi } from '../../axios/api/chatApi';

type ChatContextType = {
  messages: IMessage[];
  sendMessage: (content: string, sender: 'user' | 'admin') => void;
  fetchMessages: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  // Get All
  const fetchMessages = async () => {
    try {
      const fetchedMessages = await fetchMessagesApi();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Không thể tải tin nhắn:', error);
    }
  };
  //Post
  const sendMessage = useCallback(
    async (content: string, sender: 'user' | 'admin') => {
      try {
        const message = await sendMessageApi(content, sender);
        emitMessage(message); // Phát tin nhắn qua socket
      } catch (error) {
        console.error('Không thể gửi tin nhắn:', error);
      }
    },
    []
  );

  useEffect(() => {
    listenToNewMessages(message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    onSocketConnect(() => {
      console.log('Đã kết nối tới máy chủ Socket.IO');
    });

    onSocketDisconnect(() => {
      console.log('Đã ngắt kết nối khỏi máy chủ Socket.IO');
    });

    return () => {
      offSocketEvents();
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

