import { FaMobileAlt, FaWindows, FaRegNewspaper, FaMagic } from 'react-icons/fa';
import { GiLaptop } from 'react-icons/gi';
import { GoChecklist } from 'react-icons/go';
import { GrGallery } from 'react-icons/gr';
import { ImTable } from 'react-icons/im';
import { IoTabletLandscape } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { PiDevicesDuotone, PiDevicesBold } from 'react-icons/pi';
import { RiMacbookFill, RiPagesLine } from 'react-icons/ri';

interface MenuItem {
  name: string;
  icon?: IconType;
  link: string;
  submenu?: { name: string; link: string; icon?: IconType }[];
}
const menuItems: MenuItem[] = [
  {
    icon: PiDevicesDuotone,
    name: 'Máy cũ, Thu cũ',
    link: '',
    submenu: [
      {
        icon: PiDevicesBold,
        name: 'Thiết bị đã qua sử dụng',
        link: '/thiet-bi-da-qua-su-dung'
      },
      {
        icon: ImTable,
        name: 'Bảng Giá Thu Mua',
        link: '/bang-gia-thu-mua'
      }
    ]
  },
  {
    icon: FaMobileAlt,
    name: 'Điện Thoại',
    link: '/dien-thoai'
  },
  {
    icon: IoTabletLandscape,
    name: 'Máy tính bảng',
    link: '/may-tinh-bang'
  },
  {
    icon: GiLaptop,
    name: 'Laptop',
    link: '',
    submenu: [
      {
        icon: FaWindows,
        name: 'Windows',
        link: '/windows'
      },
      {
        icon: RiMacbookFill,
        name: 'Macbook',
        link: '/macbook'
      }
    ]
  },

  {
    icon: FaRegNewspaper,
    name: 'Tin tức',
    link: '',
    submenu: [
      {
        name: 'Tin công nghệ',
        icon: RiPagesLine,
        link: '/tin-tuc-moi-nhat'
      },
      {
        name: 'Thủ thuật - Mẹo hay',
        icon: FaMagic,
        link: '/thu-thuat-va-meo-hay'
      }
    ]
  },
  {
    icon: GrGallery,
    name: 'Hành trình',
    link: '/hanh-trinh-khach-hang'
  },
  {
    icon: GoChecklist,
    name: 'Chính sách bảo hành',
    link: '/chinh-sach-bao-hanh'
  }
];
export default menuItems;
