import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link, useParams } from 'react-router-dom';
import { PhoneContext } from '../../../context/phone/PhoneContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { getPhoneById } = useContext(PhoneContext);
  const [phone, setPhone] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchedPhone = getPhoneById(id);
      setPhone(fetchedPhone);
    }
  }, [id, getPhoneById]);

  if (!phone) return <p>Loading...</p>;
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Chi Tiết Sản Phẩm" />
      <div className="pt-[100px] xl:pt-0">
        <div className="breadcrumbs mb-10 px-[10px] py-2 text-sm text-black shadow dark:text-white lg:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/product-detail">Chi Tiết Sản Phẩm</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1>{phone.name}</h1>
          <img src={phone.img} alt={phone.name} />
          <p>{phone.description}</p>
          <p>
            Giá: {(phone.price * 1000).toLocaleString('vi-VN')} <sup>đ</sup>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
