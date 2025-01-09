import React from 'react';
import { Footer } from 'react-daisyui';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets/images';
import { FaMapLocationDot } from 'react-icons/fa6';
import { FaFacebook, FaFacebookMessenger, FaPhone } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

const FooterFC: React.FC = () => {
  return (
    <div className="mb-[40px] xl:mb-0">
      <Footer className="item-center flex flex-col justify-between bg-black px-2 pb-0 pt-10 text-white xl:flex-row xl:px-[100px] xl:pb-10">
        {/* Logo */}
        <div className="w-full">
          <img
            width={140}
            loading="lazy"
            src={Logo}
            alt="LOGO"
            className="rounded-full border border-white"
          />
        </div>
        {/* 1 */}
        <div className="w-full">
          <Footer.Title className="border-b-[1px]">Thông Tin</Footer.Title>
          <Link className="font-light hover:font-semibold" to="/phone-list">
            Điện Thoại IPhone
          </Link>
          <Link className="font-light hover:font-semibold" to="/ipad-list">
            iPad/ Máy Tính Bảng
          </Link>
          <Link className="font-light hover:font-semibold" to="/window-list">
            Laptop Window
          </Link>
          <Link className="font-light hover:font-semibold" to="/macbook-list">
            Laptop Macbook
          </Link>
          <Link className="font-light hover:font-semibold" to="/price-list">
            Bảng Giá Thu Mua
          </Link>
          <Link className="font-light hover:font-semibold" to="/about-us">
            Về Chúng Tôi
          </Link>
          <Link
            className="font-light hover:font-semibold"
            to="/warranty-policy"
          >
            Chính Sách Bảo Hành
          </Link>
        </div>
        {/* 2 */}
        <div className="w-full">
          <Footer.Title className="border-b-[1px]">Chính Sách</Footer.Title>
          <Link
            className="font-light hover:font-semibold"
            to="/terms-of-service"
          >
            Điều Khoản Dịch Vụ
          </Link>
          <Link className="font-light hover:font-semibold" to="/privacy-policy">
            Chính Sách Bảo Mật
          </Link>
        </div>
        {/* 3 */}
        <div className="w-full">
          <Footer.Title className="border-b-[1px]">
            Liên Hệ Với Chúng Tôi
          </Footer.Title>
          <div className="mb-2 flex flex-row items-center justify-center gap-5 text-3xl">
            <Link
              title="Fanpage"
              target="_blank"
              to={'https://www.facebook.com/7teck.vn'}
              className="rounded-full"
            >
              <FaFacebook />
            </Link>
            <Link
              title="Messenger"
              target="_blank"
              to={'https://www.messenger.com/t/dangkhoa.pham.93'}
              className="rounded-full"
            >
              <FaFacebookMessenger />
            </Link>
            <Link
              title="Zalo"
              target="_blank"
              className="black rounded-full bg-white px-[2px] py-[6px] text-sm font-semibold text-black"
              to={'https://zalo.me/0983699993'}
            >
              Zalo
            </Link>
          </div>
          <Link
            className="flex items-center gap-2 font-light hover:font-semibold"
            to="tel:0983699993"
          >
            <FaPhone /> (+84) 983.699.993 (Khoa)
          </Link>
          <Link
            target="_blank"
            className="flex items-center gap-2 font-light hover:font-semibold"
            to="mailto:cskh.7teck@gmail.com"
          >
            <IoMail /> cskh.7teck@gmail.com
          </Link>
        </div>
        {/* 4 */}
        <div className="w-full">
          <Footer.Title className="border-b-[1px]">Địa chỉ</Footer.Title>
          <div className="flex w-full flex-col gap-2 font-light">
            <p className="flex items-start gap-2">
              <FaMapLocationDot className="text-xl" />
              136/11 Trần Quang Diệu, Phường 12, Quận 3, HCM
            </p>
            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.271071352896!2d106.6786446!3d10.7905386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d52d04f15f%3A0x8555cb3fa100eddc!2zMTM2LzExIFRy4bqnbiBRdWFuZyBEaeG7h3UsIFBoxrDhu51uZyAxMiwgUXXhuq1uIDMsIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1736386031303!5m2!1svi!2s"
                className="h-[350px] w-full xl:h-[250px] xl:w-[300px]"
              ></iframe>
            </div>
          </div>
        </div>
      </Footer>
      <div className="border-t-[1px] border-gray-600 bg-black py-2 text-center text-white">
        © 2024 Copyright 7Teck
      </div>
    </div>
  );
};

export default FooterFC;
