import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PhoneContext } from '../context/phone/PhoneContext';
import useSeo from '../hooks/useSeo';
import PhoneDetailPage from '../pages/user/phone/PhoneDetailPage';

const PhoneDetailPageSEO:React.FC = () => {
    const { id } = useParams();
    const { getPhoneById } = useContext(PhoneContext);
    const [phone, setPhone] = useState<any>(null);
  
    useEffect(() => {
      if (id) {
        const fetchPhone = async () => {
          try {
            const fetchedPhone = await getPhoneById(id);
            if (fetchedPhone) {
              setPhone(fetchedPhone);
            }
          } catch (error) {
            console.log(error);
          }
        };
  
        fetchPhone();
      }
    }, [id, getPhoneById]);
    useSeo({
      title: `${phone?.name} - 7Teck`,
      canonical: `${window.location.origin}/chi-tiet-iphone/${phone?._id}`,
      meta: [
        {
          name: 'description',
          content: ''
        },
        { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
      ]
    });
    return <PhoneDetailPage />;
}

export default PhoneDetailPageSEO
