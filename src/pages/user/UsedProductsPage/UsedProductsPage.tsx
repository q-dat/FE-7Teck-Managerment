import { useState, memo, useCallback, useEffect } from 'react';
import HeaderResponsive from '../../../components/userPage/HeaderResponsive';
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
      className={`fixed left-0 top-1/3 z-[999] mx-1 w-auto overflow-hidden rounded-r-[50%] border-2 border-b-0 border-l-0 border-t-0 border-primary bg-gradient-to-r from-transparent to-white py-[25px] text-primary transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'ml-4 -translate-x-full'
      }`}
    >
      <div className="flex h-full cursor-pointer flex-row items-center justify-center gap-1">
        <nav className="flex w-full flex-col items-start justify-center gap-2">
          {categories.map(({ id, label }) => (
            <button
              key={id}
              className={`w-full rounded-sm border border-primary bg-primary px-1 py-2 text-start text-sm hover:scale-105 hover:outline hover:outline-offset-1 hover:outline-primary ${
                selectedCategory === id ? 'bg-white text-primary' : 'text-white'
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
const CategorySection = memo(({ isOpen }: { isOpen: boolean }) => (
  <div
    className={`px-2 transition-all duration-300 xl:px-desktop-padding ${
      isOpen ? 'ml-20 xl:ml-5' : 'ml-0'
    }`}
  >
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
      const offset = 115; // Khoảng cách từ top
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

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1 // Section chiếm 100% viewport thì kích hoạt
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSelectedCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    categories.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Thiết Bị Đã Qua Sử Dụng" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-desktop-padding">
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
          <CategorySection isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default memo(UsedProductsPage);
