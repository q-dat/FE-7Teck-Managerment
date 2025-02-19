import React, { lazy, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSeo from '../../hooks/useSeo';
import { MacbookContext } from '../../context/macbook/MacbookContext';
const MacbookDetailPage = lazy(
  () => import('../../pages/user/DetailsPage/MacbookDetailPage')
);

const MacbookDetailPageSEO: React.FC = () => {
  const { id } = useParams();
  const { getMacbookById } = useContext(MacbookContext);
  const [macbook, setMacbook] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchMacbook = async () => {
        try {
          const fetchedMacbook = await getMacbookById(id);
          if (fetchedMacbook) {
            setMacbook(fetchedMacbook);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchMacbook();
    }
  }, [id, getMacbookById]);
  useSeo({
    title: `${macbook?.name} - 7Teck`,
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <MacbookDetailPage />;
};

export default MacbookDetailPageSEO;

