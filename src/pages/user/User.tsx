import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/UserPage/Header';
import FooterFC from '../../components/UserPage/Footer';
import ContactForm from '../../components/UserPage/ContactForm';
import ScrollToTopButton from '../../components/orther/scrollToTop/ScrollToTopButton';
import NavBottom from '../../components/UserPage/NavBottom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NotificationPopup from '../../components/UserPage/NotificationPopup';

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
      <NotificationPopup/>
      <ContactForm />
      <FooterFC />
      <NavBottom />
    </div>
  );
};

export default User;
