import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/UserPage/Header';
import FooterFC from '../../components/UserPage/Footer';
import ContactForm from '../../components/UserPage/ContactForm';
import ScrollToTopButton from '../../components/orther/scrollToTop/ScrollToTopButton';
import NavBottom from '../../components/UserPage/NavBottom';

const User: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black dark:bg-opacity-80">
      <Header />
      <ScrollToTopButton />
      <Outlet />
      <ContactForm />
      <FooterFC />
      <NavBottom />
    </div>
  );
};

export default User;
