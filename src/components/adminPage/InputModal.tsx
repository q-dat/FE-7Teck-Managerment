import React, { forwardRef } from 'react';

type InputModalProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  containerClassName?: string;
};

const InputModal = forwardRef<HTMLInputElement, InputModalProps>(
  ({ placeholder, className, containerClassName, style, ...props }, ref) => {
    return (
      <div className={`mb-4 w-full border-b ${containerClassName || ''}`}>
        <input
          ref={ref}
          className={`w-full rounded-md border-none bg-white p-0 text-sm font-light text-black placeholder-black focus:outline-none dark:bg-transparent dark:text-white dark:placeholder-white ${className || ''}`}
          placeholder={placeholder}
          style={{
            outline: 'none',
            boxShadow: 'none',
            ...style
          }}
          {...props}
        />
      </div>
    );
  }
);

InputModal.displayName = 'InputModal';

export default InputModal;