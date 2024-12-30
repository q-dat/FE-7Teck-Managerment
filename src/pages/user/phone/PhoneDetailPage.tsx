import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link, useParams } from 'react-router-dom';
import { PhoneContext } from '../../../context/phone/PhoneContext';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { LoadingLocal } from '../../../components/orther/loading';
import { phoneFieldMap } from '../../../components/orther/data/phoneFieldMap';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { getPhoneById, loading, error } = useContext(PhoneContext);
  const [phone, setPhone] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchedPhone = getPhoneById(id);
      setPhone(fetchedPhone);
    }
  }, [id, getPhoneById]);

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile={phone?.name} />
      <div className="pt-[100px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow dark:text-white xl:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/phone-list">Thông Tin Sản Phẩm</Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="px-2 xl:px-20">
          <p className="py-5 text-2xl font-semibold">
            Điện thoại {phone?.name}
          </p>
          {/*  */}
          <div className="flex flex-col items-start justify-start gap-2 xl:flex-row">
            <div className="flex flex-col items-start justify-between gap-2">
              <div className="w-full flex-1 rounded-md bg-white xl:w-[400px]">
                <img
                  src={phone?.img}
                  alt={phone?.name}
                  className="rounded-md"
                />
              </div>
              <div className="w-[80px] rounded-md bg-white">
                <img
                  src={phone?.thumbnail}
                  alt={phone?.name}
                  className="rounded-md"
                />
              </div>
            </div>
            {/*  */}
            <div className="flex w-full flex-col rounded-md bg-white p-2">
              <p className="text-lg font-bold text-red-500">
                {(phone?.price * 1000).toLocaleString('vi-VN')} <sup>đ</sup>
              </p>
              <p>
                Màu sắc:
                <strong>{phone?.color}</strong>
              </p>
            </div>
          </div>
          <div className="mt-2 rounded-md bg-white p-2">
            {/*  */}
            <div>
              {phoneFieldMap.map(group => (
                <div key={group?.group}>
                  <details>
                    <summary>{group?.name}</summary>
                    {group?.fields.map(field => (
                      <div  className=' divide-y-[1px]' key={field?.field}>
                        <strong>{field?.name}</strong>
                        <div>
                          {phone?.[group?.group]?.[field?.field]}
                        </div>
                      </div>
                    ))}
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
