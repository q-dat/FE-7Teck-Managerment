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
          <Footer.Title className="border-b-[1px]">Sesstion 1</Footer.Title>
          <Link className="font-light hover:font-semibold" to={''}>
            a
          </Link>
          <Link className="font-light hover:font-semibold" to={''}>
            a
          </Link>
          <Link className="font-light hover:font-semibold" to={''}>
            a
          </Link>
        </div>
        {/* 2 */}
        <div className="w-full">
          <Footer.Title className="border-b-[1px]">Sesstion 2</Footer.Title>

          <Link className="font-light hover:font-semibold" to={''}>
            a
          </Link>
          <Link className="font-light hover:font-semibold" to={''}>
            a
          </Link>
        </div>
        {/* 3 */}
        <div className="w-full">
          <Footer.Title className="border-b-[1px]">Liên Hệ</Footer.Title>
          <div className="mb-2 flex flex-row items-center justify-center gap-5 text-3xl">
            <Link to={''} className="rounded-full">
              <FaFacebook />
            </Link>
            <Link to={''} className="rounded-full">
              <FaFacebookMessenger />
            </Link>
            <Link
              className="black rounded-full bg-white px-[2px] py-[6px] text-sm font-semibold text-[#69181b]"
              to={''}
            >
              Zalo
            </Link>
          </div>
          <Link
            className="flex items-center gap-2 font-light hover:font-semibold"
            to="tel:0333133050"
          >
            <FaPhone /> 0333133050
          </Link>
          <Link
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
