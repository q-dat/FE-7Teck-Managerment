import React from 'react';
import { LogoMessenger, LogoZalo } from '../../assets/images';
import { Link } from 'react-router-dom';

const ContactForm: React.FC = () => {
  return (
    <div className="fixed bottom-[58px] right-1 z-[99999] space-y-2 xl:bottom-5 xl:right-2">
      <div>
        <Link
          title="Liên hệ qua Messenger"
          target="_blank"
          to={'https://www.messenger.com/t/dangkhoa.pham.93'}
          aria-label="Liên hệ qua Messenger"
        >
          <img
            src={LogoMessenger}
            alt="Messenger"
            className="h-full w-[45px] rounded-xl xl:w-[50px]"
          />
        </Link>
      </div>
      <div>
        <Link
          title="Liên hệ qua Zalo"
          target="_blank"
          to={'https://zalo.me/0983699993'}
          aria-label="Liên hệ qua Zalo"
        >
          <img
            src={LogoZalo}
            alt="Zalo"
            className="h-full w-[45px] animate-fadeIn rounded-full xl:w-[50px]"
          />
        </Link>
      </div>
    </div>
  );
};

export default ContactForm;
