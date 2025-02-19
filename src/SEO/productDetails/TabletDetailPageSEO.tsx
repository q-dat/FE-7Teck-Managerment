import React, { lazy, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSeo from '../../hooks/useSeo';
import { TabletContext } from '../../context/tablet/TabletContext';
const TabletDetailPage = lazy(
  () => import('../../pages/user/DetailsPage/TabletDetailPage')
);

const TabletDetailPageSEO: React.FC = () => {
  const { id } = useParams();
  const { getTabletById } = useContext(TabletContext);
  const [tablet, setTablet] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchTablet = async () => {
        try {
          const fetchedTablet = await getTabletById(id);
          if (fetchedTablet) {
            setTablet(fetchedTablet);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchTablet();
    }
  }, [id, getTabletById]);
  useSeo({
    title: `${tablet?.tablet_name} - 7Teck`,
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <TabletDetailPage />;
};

export default TabletDetailPageSEO;

