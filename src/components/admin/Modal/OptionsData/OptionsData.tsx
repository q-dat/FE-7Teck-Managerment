import React from 'react';
interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

const OptionsData: React.FC<ModalCreateAdminProps> = ({ isOpen, onClose }) => {
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div
      onClick={handleOverlayClick}
      className="modal-overlay fixed inset-0 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-5/6"
      >
        <h1>Danh mục options thông tin sản phẩm!</h1>
      </div>
    </div>
  );
};

export default OptionsData;
