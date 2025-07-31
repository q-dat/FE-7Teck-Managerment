import React from 'react';
import { LogoZalo } from '../../assets/images';
import { Link } from 'react-router-dom';
import { FaFacebookMessenger } from 'react-icons/fa6';
import { messengerUrl, zaloUrl } from '../utils/socialLinks';

const ContactForm: React.FC = () => {
  return (
    <div className="fixed bottom-[58px] right-1 z-[99999] space-y-2 xl:bottom-5 xl:right-2">
      <div>
        <Link title="Liên hệ qua Messenger" target="_blank" to={messengerUrl} aria-label="Liên hệ qua Messenger">
          <FaFacebookMessenger className="text-[50px] text-[#1f6bf6]" />
        </Link>
      </div>
      <div>
        <Link title="Liên hệ qua Zalo" target="_blank" to={zaloUrl} aria-label="Liên hệ qua Zalo">
          <img src={LogoZalo} alt="Zalo" className="h-full w-[45px] animate-zoomBorderBtn rounded-full xl:w-[50px]" />
        </Link>
      </div>
    </div>
  );
};

export default ContactForm;
