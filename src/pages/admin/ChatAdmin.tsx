import React from 'react';
import ChatBox from '../../components/chatbox/ChatBox';
import ChatInput from '../../components/chatbox/ChatInput';

const ChatAdmin: React.FC = () => {
  return (
    <div>
      <p className='font-bold'>Hỗ trợ khách hàng:</p>
      <div className="bg-white px-5 pb-10 pt-5 rounded-md">
        <ChatBox sender="admin" />
        <ChatInput sender="admin" />
      </div>
    </div>
  );
};

export default ChatAdmin;

