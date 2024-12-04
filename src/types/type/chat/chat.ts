export interface IMessage  {
    _id: string;
    chat_catalog_id?: string;
    sender: 'user' | 'admin';
    content: string;
    timestamp: string;
  };