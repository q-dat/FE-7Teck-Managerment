import React, { useState } from 'react';

interface Props {
  prodId: string;
  value: string;
  onSubmit: (id: string, value: string) => Promise<void>;
}

const InlineDescriptionEditor: React.FC<Props> = ({ prodId, value, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = async () => {
    await onSubmit(prodId, tempValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Display */}
      <div onClick={() => setIsOpen(true)} className="line-clamp-3 w-20">
        {value || 'Trống!'}
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="absolute right-0 top-0 z-50 w-[30vw] rounded-lg border border-green-500 bg-white p-2 font-light text-black dark:bg-gray-900 dark:text-white">
          <textarea
            className="w-full bg-white p-1 text-sm shadow-xl focus:outline-none dark:bg-gray-900"
            rows={10}
            value={tempValue}
            onChange={e => setTempValue(e.target.value)}
          />

          <div className="mt-2 flex justify-end gap-2">
            <button
              className="btn btn-xs"
              onClick={() => {
                setTempValue(value);
                setIsOpen(false);
              }}
            >
              Huỷ
            </button>
            <button className="btn btn-primary btn-xs text-white" onClick={handleSave}>
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InlineDescriptionEditor;
