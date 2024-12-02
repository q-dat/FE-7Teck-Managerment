import React, { useState } from 'react';
import { useChat } from '../../context/chat/ChatContext';
import { IoPaperPlane } from 'react-icons/io5';
import { Button } from 'react-daisyui';
import { Toastify } from '../../helper/Toastify';

type ChatInputProps = {
  sender: 'user' | 'admin';
};

const ChatInput: React.FC<ChatInputProps> = ({ sender }) => {
  const [content, setContent] = useState('');
  const { sendMessage } = useChat();

  const handleSend = async () => {
    try {
      if (content.trim()) {
        await sendMessage(content, sender);
        setContent('');
      }
    } catch (error) {
      Toastify('Không thể gửi tin nhắn của bạn!', 500);
    }
  };

  return (
    <div className="relative mt-5 flex w-full items-center justify-between gap-x-2 rounded-lg border p-1 shadow-inner">
      <input
        className="w-full rounded-md p-1 text-black focus:outline-none"
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Soạn tin..."
      />
      <Button
        size="xs"
        color="primary"
        className="absolute outline outline-offset-2 right-2  rounded-md  text-white"
        onClick={handleSend}
      >
        <IoPaperPlane/>
        Gửi
      </Button>
    </div>
  );
};

export default ChatInput;

