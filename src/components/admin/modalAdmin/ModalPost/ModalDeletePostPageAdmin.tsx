import React from 'react';
import { Button } from 'react-daisyui';

interface ModalDeletePostProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalDeletePostPageAdmin: React.FC<ModalDeletePostProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="modal-overlay fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="flex flex-col items-center rounded-lg bg-white p-5 shadow dark:bg-gray-800"
      >
        <div className="">
          <p className="font-bold text-black dark:text-white">Bạn có chắc muốn xóa bài viết này?</p>
        </div>
        <div className="w-[300px] py-5 text-center text-gray-50">
          Sau khi bạn nhấn
          <label className="font-bold text-primary">"Xác Nhận"</label>
        </div>
        <div className="flex w-64 flex-col space-y-3 text-center">
          <Button color="primary" type="submit" className="text-white" onClick={onConfirm}>
            Xác Nhận
          </Button>

          <Button onClick={onClose} className="border-gray-50 text-black dark:text-white">
            Huỷ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeletePostPageAdmin;
