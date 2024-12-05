import { IChatCatalog } from "./chat-catalog";

export interface IMessage {
  _id: string;
  chat_catalog_id: IChatCatalog;
  sender: 'user' | 'admin';
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

