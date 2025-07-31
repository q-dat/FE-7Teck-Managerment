import { useEffect } from 'react';

interface SeoConfig {
  title?: string; // Tiêu đề trang
  canonical?: string; // URL chuẩn (canonical)
  meta?: {
    name: string; // Tên của meta tag (vd: description, keywords)
    content: string; // Nội dung của meta tag
  }[];
}

const useSeo = ({ title, canonical, meta }: SeoConfig) => {
  useEffect(() => {
    // Đặt tiêu đề trang
    if (title) {
      document.title = title;
    }

    // Đặt thẻ canonical
    if (canonical) {
      let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Đặt các thẻ meta
    if (meta && meta.length > 0) {
      meta.forEach(({ name, content }) => {
        let metaTag: HTMLMetaElement | null = document.querySelector(`meta[name="${name}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.name = name;
          document.head.appendChild(metaTag);
        }
        metaTag.content = content;
      });
    }
  }, [title, canonical, meta]);
};

export default useSeo;
