import React, { lazy, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSeo from '../../hooks/useSeo';
import { WindowsContext } from '../../context/windows/WindowsContext';
const WindowsDetailPage = lazy(
  () => import('../../pages/user/DetailsPage/WindowsDetailPage')
);

const WindowsDetailPageSEO: React.FC = () => {
  const { id } = useParams();
  const { getWindowsById } = useContext(WindowsContext);
  const [windows, setWindows] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchWindows = async () => {
        try {
          const fetchedWindows = await getWindowsById(id);
          if (fetchedWindows) {
            setWindows(fetchedWindows);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchWindows();
    }
  }, [id, getWindowsById]);
  useSeo({
    title: `${windows?.windows_name} - 7Teck`,
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <WindowsDetailPage />;
};

export default WindowsDetailPageSEO;

