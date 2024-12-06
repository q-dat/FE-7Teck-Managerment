import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { IChatCatalog } from '../../types/type/chat/chat-catalog';
import {
  getAllChatCatalogsApi,
  createChatCatalogApi,
  deleteChatCatalogApi
} from '../../axios/api/chatCatalogApi';
import { AxiosResponse } from 'axios';

interface ChatCatalogContextType {
  chatCatalogs: IChatCatalog[];
  loading: {
    getAll: boolean;
    create: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllChatCatalogs: () => void;
  getChatCatalogById: (_id: string) => IChatCatalog | undefined;
  createChatCatalog: (chatCatalog: IChatCatalog) => Promise<AxiosResponse<any>>;
  deleteChatCatalog: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: ChatCatalogContextType = {
  chatCatalogs: [],
  loading: {
    getAll: false,
    create: false,
    delete: false
  },
  error: null,
  getAllChatCatalogs: () => {},
  getChatCatalogById: () => undefined,
  createChatCatalog: async () =>
    ({ data: { savedChatCatalog: null } }) as AxiosResponse,
  deleteChatCatalog: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const ChatCatalogContext =
  createContext<ChatCatalogContextType>(defaultContextValue);

export const ChatCatalogProvider = ({ children }: { children: ReactNode }) => {
  const [chatCatalogs, setChatCatalogs] = useState<IChatCatalog[]>([]);
  const [loading, setLoading] = useState<{
    getAll: boolean;
    create: boolean;
    delete: boolean;
  }>({
    getAll: false,
    create: false,
    delete: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
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

  // Get All Chat Catalogs
  const getAllChatCatalogs = useCallback(() => {
    fetchData(
      getAllChatCatalogsApi,
      data => setChatCatalogs(data.chatCatalogs || []),
      'getAll'
    );
  }, []);

  // Get Chat Catalog By Id
  const getChatCatalogById = useCallback(
    (id: string) => {
      return chatCatalogs.find(catalog => catalog._id === id);
    },
    [chatCatalogs]
  );

  // Create Chat Catalog
  const createChatCatalog = useCallback(
    async (chatCatalog: IChatCatalog): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createChatCatalogApi(chatCatalog),
        data => {
          if (data.savedChatCatalog) {
            setChatCatalogs(prevChatCatalogs => [
              ...prevChatCatalogs,
              data.savedChatCatalog
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Delete Chat Catalog
  const deleteChatCatalog = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteChatCatalogApi(id),
        () =>
          setChatCatalogs(prevChatCatalogs =>
            prevChatCatalogs.filter(catalog => catalog._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllChatCatalogs();
  }, [getAllChatCatalogs]);

  return (
    <ChatCatalogContext.Provider
      value={{
        chatCatalogs,
        loading,
        error,
        getAllChatCatalogs,
        getChatCatalogById,
        createChatCatalog,
        deleteChatCatalog
      }}
    >
      {children}
    </ChatCatalogContext.Provider>
  );
};

