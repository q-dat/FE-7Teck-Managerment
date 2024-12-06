import React, { useContext, useEffect, useRef, useState } from 'react';
import { ChatCatalogContext } from '../../context/chat/ChatCatalogContext';
import { useChat } from '../../context/chat/ChatContext';
import { IChatCatalog } from '../../types/type/chat/chat-catalog';
import ChatInput from './ChatInput';

type ChatBoxProps = {
  sender: 'user' | 'admin';
};

const ChatBox: React.FC<ChatBoxProps> = ({ sender }) => {
  const { createChatCatalog } = useContext(ChatCatalogContext);
  const { messages, fetchMessages } = useChat();

  const [isInfoEntered, setIsInfoEntered] = useState(false);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  //
  useEffect(() => {
    fetchMessages();
  }, []);
  //
  const handleInfoSubmit = async () => {
    if (username.trim() && phone.trim()) {
      try {
        const newChatCatalog: Omit<IChatCatalog, '_id'> = {
          username,
          phone,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const response = await createChatCatalog(newChatCatalog);
        const createdCatalogId = response.data.savedChatCatalog._id;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('chat_catalog_id', createdCatalogId);
        setIsInfoEntered(true); 
      } catch (error) {
        alert('Không thể tạo danh mục chat. Vui lòng thử lại!');
        console.error('Lỗi khi tạo danh mục chat:', error);
      }
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  };
  //
  useEffect(() => {
    if (sender === 'user') {
      const storedUsername = sessionStorage.getItem('username');
      if (storedUsername ) {
        setIsInfoEntered(true);
        setUsername(storedUsername);
      }
    } else {
      setIsInfoEntered(true);
    }
  }, [sender]);

  //
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isInfoEntered) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        <h2 className="text-lg font-semibold">
          Nhập thông tin để bắt đầu chat
        </h2>
        <input
          type="text"
          placeholder="Tên của bạn"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full rounded-md border p-2 text-sm"
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full rounded-md border p-2 text-sm"
        />
        <button
          onClick={handleInfoSubmit}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Bắt đầu chat
        </button>
      </div>
    );
  }

  return (
    <div
      ref={chatBoxRef}
      className="h-[300px] w-[300px] space-y-2 overflow-y-auto scrollbar-hide xl:h-[300px]"
    >
      {messages.map(message => (
        <div
          key={message._id}
          className={`w-full rounded-md bg-white text-black ${message.sender}`}
        >
          <div className="rounded-md border border-dotted border-gray-50 p-1 shadow">
            <p className="text-xs font-light text-black">
              {message.sender === sender ? 'Bạn' : 'Hỗ trợ'}:
              <span className="w-full text-sm font-semibold text-blue-500">
                {' '}
                {message.content}
              </span>
            </p>
            <p className="text-xs font-light">
              {new Date(message?.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>
      ))}
      <ChatInput sender="user" />
    </div>
  );
};

export default ChatBox;

