import React from 'react';
import { useChat } from '../../context/chat/ChatContext';
import { IoPaperPlane } from 'react-icons/io5';
import { Button } from 'react-daisyui';
import { Toastify } from '../../helper/Toastify';
import { useForm, Controller } from 'react-hook-form';
import { IMessage } from '../../types/type/chat/chat';

type ChatInputProps = {
  sender: 'user' | 'admin';
};

const ChatInput: React.FC<ChatInputProps> = ({ sender }) => {
  const { sendMessage } = useChat();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      content: ''
    }
  });
  // Pots
  const chatCatalogId = sessionStorage.getItem('chat_catalog_id') || '';
  const onSubmit = async (data: { content: string }) => {
    try {
      if (data.content.trim() && chatCatalogId) {
        const message: IMessage = {
          content: data.content,
          sender,
          chat_catalog_id: chatCatalogId,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        await sendMessage(message);
        reset();
      } else {
        Toastify('Vui lòng chọn danh mục chat để gửi tin nhắn!', 500);
      }
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
      Toastify('Không thể gửi tin nhắn của bạn!', 500);
    }
  };

  return (
    <form
      className="relative mt-5 flex w-full items-center justify-between gap-x-2 rounded-lg border p-1 shadow"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="content"
        control={control}
        rules={{ required: 'Vui lòng nhập nội dung tin nhắn' }}
        render={({ field }) => (
          <input
            {...field}
            className="w-full rounded-md p-1 text-black focus:outline-none"
            placeholder="Soạn tin..."
          />
        )}
      />
      {errors.content && (
        <span className="text-xs text-red-500">{errors.content.message}</span>
      )}

      <Button
        size="xs"
        color="primary"
        className="absolute right-2 rounded-md text-white outline outline-offset-2"
        type="submit"
      >
        <IoPaperPlane />
        Gửi
      </Button>
    </form>
  );
};

export default ChatInput;

