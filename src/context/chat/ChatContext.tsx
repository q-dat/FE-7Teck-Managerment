import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode
} from 'react';
import {
  listenToNewMessages,
  emitMessage,
  onSocketConnect,
  onSocketDisconnect,
  offSocketEvents
} from '../../socket/chatSocket';
import { IMessage } from '../../types/type/chat/chat'; // Import IMessage
import { fetchMessagesApi, sendMessageApi } from '../../axios/api/chatApi';
import { AxiosResponse } from 'axios';

interface ChatContextType {
  messages: IMessage[];
  loading: {
    fetch: boolean;
    send: boolean;
  };
  error: string | null;
  fetchMessages: () => void;
  sendMessage: (message: IMessage) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: ChatContextType = {
  messages: [],
  loading: {
    fetch: false,
    send: false
  },
  error: null,
  fetchMessages: () => {},
  sendMessage: async () => ({ data: {} }) as AxiosResponse
};

export const ChatContext = createContext<ChatContextType>(defaultContextValue);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState({
    fetch: false,
    send: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Đã xảy ra lỗi!');
  };

  const fetchData = async (
    apiCall: () => Promise<AxiosResponse<any>>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading
  ): Promise<AxiosResponse<any>> => {
    setLoading(prev => ({ ...prev, [requestType]: true }));
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response.data);
      return response;
    } catch (err: any) {
      handleError(err);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [requestType]: false }));
    }
  };

  // Get All
  const fetchMessages = useCallback(() => {
    fetchData(
      fetchMessagesApi,
      data => {
        const chats = data?.chats || [];
        setMessages(chats);
      },
      'fetch'
    );
  }, []);

  // Post
  const sendMessage = useCallback(
    async (chatMessage: IMessage): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => sendMessageApi(chatMessage),
        data => {
          if (data) emitMessage(data);
        },
        'send'
      );
    },
    []
  );

  // Socket Connect
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

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        error,
        fetchMessages,
        sendMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('useChat phải được sử dụng trong ChatProvider');
  }
  return context;
};

