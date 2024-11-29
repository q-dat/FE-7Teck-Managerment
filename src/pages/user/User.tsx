import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/UserPage/Header';
import FooterFC from '../../components/UserPage/Footer';
import ContactForm from '../../components/UserPage/ContactForm';
import ScrollToTopButton from '../../components/orther/scrollToTop/ScrollToTopButton';
// import NotificationPopup from '../../components/UserPage/NotificationPopup';

const User: React.FC = () => {
  return (
    // dark:bg-[#3e3e3f]
    <div className="bg-white dark:bg-gray-900 xl:dark:bg-[#3e3e3f]">
      <Header />
      <ScrollToTopButton />
      <Outlet />
      <ContactForm />
      {/* <NotificationPopup /> */}
      <FooterFC />
    </div>
  );
};

export default User;
