import React, { useEffect } from 'react';
import { useChat } from '../../context/chat/ChatContext';

type ChatBoxProps = {
  sender: 'user' | 'admin';
};

const ChatBox: React.FC<ChatBoxProps> = ({ sender }) => {
  const { messages, fetchMessages } = useChat();

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="h-[300px] w-[300px] space-y-2 overflow-y-auto scrollbar-hide xl:h-[300px]">
      {messages.map(message => (
        <div
          key={message._id}
          className={`w-full bg-white rounded-md  text-black ${message.sender}`}
        >
          <div className="rounded-md border border-dashed border-gray-50 p-1">
            <p className="font-semibold">
              {message.sender === sender ? 'Bạn' : 'Hỗ trợ'}:
              <span className="w-full font-light text-blue-500"> {message.content}</span>
            </p>
            <p className="text-xs font-light">
              {new Date(message.timestamp).toLocaleTimeString('vi-VN')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;

