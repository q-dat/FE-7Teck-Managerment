import React, { useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';
import UsedPhonePage from './UsedPhonePage';
import UsedTabletPage from './UsedTabletPage';
import UsedMacbookPage from './UsedMacbookPage';
import UsedWindowsPage from './UsedWindowsPage';
import { MdOutlineDoubleArrow } from 'react-icons/md';

const UsedProductsPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>('used-phone');

  const scrollToSection = (id: string) => {
    setSelectedCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 110; // Khoảng cách từ top
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Thiết Bị Đã Qua Sử Dụng" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-20">
          <ul className="font-light">
            <li>
              <Link aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link aria-label="Thiết bị qua sử dụng" to="">
                Thiết bị đã qua sử dụng
              </Link>
            </li>
          </ul>
        </div>

        {/* Menu điều hướng bên trái */}

        <div className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`fixed left-0 top-1/3 z-[999] w-[200px] rounded-r-lg bg-primary px-1 py-2 text-white shadow-lg transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : 'ml-4 -translate-x-full'
            }`}
          >
            <div className="flex h-full cursor-pointer flex-row items-center justify-center">
              <nav className="flex w-full flex-col items-start justify-center gap-1">
                {[
                  { id: 'used-phone', label: 'iPhone' },
                  { id: 'used-tablet', label: 'iPad' },
                  { id: 'used-macbook', label: 'Macbook' },
                  { id: 'used-windows', label: 'Windows' }
                ].map(category => (
                  <button
                    key={category.id}
                    className={`w-full rounded-sm border border-white px-1 py-2 text-start text-sm hover:bg-white hover:text-primary ${
                      selectedCategory === category.id
                        ? 'bg-white text-primary'
                        : ''
                    }`}
                    onClick={() => scrollToSection(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </nav>
              <div>
                <MdOutlineDoubleArrow
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>
            </div>
          </div>

          {/* Nội dung chính */}
          <div className="px-2 ml-4 xl:px-20">
            <div id="used-phone">
              <UsedPhonePage />
            </div>
            <div id="used-tablet">
              <UsedTabletPage />
            </div>
            <div id="used-macbook">
              <UsedMacbookPage />
            </div>
            <div id="used-windows">
              <UsedWindowsPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedProductsPage;
