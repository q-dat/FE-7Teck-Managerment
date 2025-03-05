import { useState, memo, useCallback } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import UsedPhonePage from './UsedPhonePage';
import UsedTabletPage from './UsedTabletPage';
import UsedMacbookPage from './UsedMacbookPage';
import UsedWindowsPage from './UsedWindowsPage';

// Danh sách danh mục sản phẩm
const categories = [
  { id: 'used-phone', label: 'iPhone' },
  { id: 'used-tablet', label: 'iPad' },
  { id: 'used-macbook', label: 'Macbook' },
  { id: 'used-windows', label: 'Windows' }
];

// Component điều hướng menu
const CategoryMenu = memo(
  ({ isOpen, toggleMenu, selectedCategory, scrollToSection }: any) => (
    <div
      onClick={toggleMenu}
      className={`fixed left-0 top-1/3 z-[999] w-[200px] rounded-r-lg bg-primary px-1 py-2 text-white shadow-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'ml-4 -translate-x-full'
      }`}
    >
      <div className="flex h-full cursor-pointer flex-row items-center justify-center">
        <nav className="flex w-full flex-col items-start justify-center gap-1">
          {categories.map(({ id, label }) => (
            <button
              key={id}
              className={`w-full rounded-sm border border-white px-1 py-2 text-start text-sm hover:bg-white hover:text-primary ${
                selectedCategory === id ? 'bg-white text-primary' : ''
              }`}
              onClick={() => scrollToSection(id)}
            >
              {label}
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
  )
);

// Component hiển thị danh mục sản phẩm
const CategorySection = memo(() => (
  <div className="ml-4 px-2 xl:px-20">
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
));

const UsedProductsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>('used-phone');

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  const scrollToSection = useCallback((id: string) => {
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
  }, []);

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

        <div className="relative">
          {/* Menu điều hướng */}
          <CategoryMenu
            isOpen={isOpen}
            toggleMenu={toggleMenu}
            selectedCategory={selectedCategory}
            scrollToSection={scrollToSection}
          />
          {/* Nội dung chính */}
          <CategorySection />
        </div>
      </div>
    </div>
  );
};

export default memo(UsedProductsPage);

