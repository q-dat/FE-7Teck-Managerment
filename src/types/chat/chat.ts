export interface IMessage  {
    _id: string;
    sender: 'user' | 'admin';
    content: string;
    timestamp: string;
  };