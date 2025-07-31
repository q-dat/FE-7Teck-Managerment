import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/userPage/Header';
import FooterFC from '../../components/userPage/Footer';
import ContactForm from '../../components/userPage/ContactForm';
import ScrollToTopButton from '../../components/orther/scrollToTop/ScrollToTopButton';
import NavBottom from '../../components/userPage/NavBottom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NotificationPopup from '../../components/userPage/NotificationPopup';

const User: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-primary-white">
      <Header />
      <ScrollToTopButton />
      <div className="flex-1 xl:pt-[130px]">
        <Outlet />
      </div>
      <NotificationPopup />
      <ContactForm />
      <FooterFC />
      <NavBottom />
    </div>
  );
};

export default User;
