import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PhoneContext } from '../../context/phone/PhoneContext';

const PhonesByCatalog = () => {
  const { phones, loading, error } = useContext(PhoneContext);
  const { catalog } = useParams();

  const filteredPhones = phones.filter(
    phone => phone.phone_catalog_id._id === catalog
  );

  if (loading.getAll) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {filteredPhones.map(phone => (
        <div
          key={phone._id}
          className="relative flex h-full flex-col justify-between rounded-md border border-gray-200 text-black"
        >
          <div className="w-[175px] xl:w-[200px]">
            <img
              className="h-[200px] w-[175px] rounded-t-md object-cover xl:h-[250px] xl:w-[200px]"
              src={phone.img}
              alt={phone.name}
            />
            <div className="px-1">
              <p>Điện thoại {phone.name}</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-1 p-1">
            <p className="text-gray-500">
              Giá:&nbsp;
              <span className="text-red-500">
                {(phone.price * 1000).toLocaleString('vi-VN')} <sup>đ</sup>
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhonesByCatalog;

