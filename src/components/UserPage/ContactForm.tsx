import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Logo,
  LogoFacebook,
  LogoMessenger,
  LogoZalo
} from '../../assets/images';
import { FaUsers } from 'react-icons/fa';
import ChatBox from '../chatbox/ChatBox';
import ChatInput from '../chatbox/ChatInput';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { MdPhoneInTalk } from 'react-icons/md';

const ContactForm: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (dropdownContentRef.current) {
      dropdownContentRef.current.style.maxHeight = isExpanded
        ? `${dropdownContentRef.current.scrollHeight}px`
        : '0';
    }
  }, [isExpanded]);

  return (
    <div className="fixed bottom-5 right-0 z-[99999] xl:right-2">
      <div className="flex w-full justify-end">
        <button
          onClick={toggleDropdown}
          className={`flex items-center rounded-full border border-white bg-primary py-[2px] pl-3 text-xs text-white ${isExpanded ? '' : 'hidden'}`}
        >
          Đóng
          <IoIosCloseCircle className="text-2xl" />
        </button>
        <button
          onClick={toggleDropdown}
          className={`relative flex items-center rounded-full border border-white bg-primary p-2 text-sm text-white ${isExpanded ? 'hidden' : ''}`}
        >
          <span className="animation-zoomBorder-Btn" />
          Chat <IoChatbubbleEllipsesOutline className="text-2xl" />
        </button>
      </div>
      <div
        ref={dropdownContentRef}
        className="dropdown-content overflow-hidden transition-[max-height] duration-300 ease-out"
        style={{
          maxHeight: isExpanded
            ? `${dropdownContentRef.current?.scrollHeight}px`
            : '0'
        }}
      >
        {/*  */}
        <div className="m-2 space-y-4 rounded-lg bg-white p-2 outline outline-offset-0 outline-primary">
          <div className="flex flex-row items-start justify-between">
            {/*  */}
            <div className="flex flex-row items-center gap-1 text-xl text-primary">
              <FaUsers />
              <p>Hỗ trợ khách hàng</p>
            </div>
            {/*  */}
            <div>
              <img
                src={Logo}
                className="h-12 w-12 rounded-full border object-cover"
                alt="7Teck"
              />
            </div>
          </div>
          <ChatBox sender="user" />
          <ChatInput sender="user" />
          {/*  */}
          <div className="flex justify-between">
            {/*  */}
            <div>
              <Link
                title="Hotline"
                target="_blank"
                to="tel:0333133050"
                rel="noopener noreferrer"
              >
                <div className="flex flex-row items-center gap-1">
                  <div className="rounded-full bg-primary p-2">
                    <MdPhoneInTalk className="text-2xl text-white" />
                  </div>
                  <div className="">
                    <p className="text-xs text-primary">Ấn để gọi:</p>
                    <p className="text-sm text-primary">0333133050</p>
                  </div>
                </div>
              </Link>
            </div>
            {/*  */}
            <div className="flex flex-row items-center gap-2">
              <Link
                title="Fanpage"
                target="_blank"
                to="https://www.messenger.com/t/quocdatstore.vn"
                rel="noopener noreferrer"
              >
                <img
                  src={LogoFacebook}
                  alt="fanpage"
                  width="40"
                  height="40"
                  className="rounded-full"
                />
              </Link>
              <Link
                title="Messenger"
                target="_blank"
                to="https://www.messenger.com/t/quocdatstore.vn"
                rel="noopener noreferrer"
              >
                <img
                  src={LogoMessenger}
                  alt="messenger"
                  width="40"
                  height="40"
                  className="rounded-full"
                />
              </Link>
              <Link
                title="Zalo"
                className="relative inline-block"
                target="_blank"
                to="https://zalo.me/0333133050"
                rel="noopener noreferrer"
              >
                <span className="animation-zoomBorder" />
                <img
                  src={LogoZalo}
                  alt="zalo"
                  width="40"
                  height="40"
                  className="rounded-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
