import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/UserPage/Header';
import FooterFC from '../../components/UserPage/Footer';
import ContactForm from '../../components/UserPage/ContactForm';
import ScrollToTopButton from '../../components/orther/scrollToTop/ScrollToTopButton';
import NavBottom from '../../components/UserPage/NavBottom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const User: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000});
  }, []);
  return (
    <div className="flex min-h-screen select-none flex-col bg-[#f2f4f7]">
      <Header /> 
      <ScrollToTopButton />
      <div className="flex-1 xl:pt-[100px]">
        <Outlet />
      </div>
      <ContactForm />
      <FooterFC />
      <NavBottom />
    </div>
  );
};

export default User;
