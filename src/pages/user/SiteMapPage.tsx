import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';

const SiteMapPage: React.FC = () => {
  const [sitemap, setSitemap] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const response = await axios.get('/sitemap.xml', {
          headers: {
            'Content-Type': 'application/xml'
          }
        });
        setSitemap(response.data);
      } catch (err) {
        setError('Không thể tải sitemap');
        console.error(err);
      }
    };

    fetchSitemap();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {sitemap ? (
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {sitemap}
        </pre>
      ) : (
        <p>Đang tải sitemap...</p>
      )}
    </div>
  );
};

export default SiteMapPage;

