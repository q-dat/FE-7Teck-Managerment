import { lazy, useContext, useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import useSeo from '../hooks/useSeo';
import { PhoneContext } from '../context/phone/PhoneContext';
import { PostContext } from '../context/post/PostContext';

// UserPage
const User = lazy(() => import('../pages/user/User'));
const HomePage = lazy(() => import('../pages/user/HomePage/HomePage'));
const ContactPage = lazy(() => import('../pages/user/ContactPage'));
const PhonePage = lazy(() => import('../pages/user/PhonePage'));
const PhoneByCatalogPage = lazy(
  () => import('../pages/user/phone/PhoneByCatalogPage')
);
const PhoneDetailPage = lazy(
  () => import('../pages/user/phone/PhoneDetailPage')
);
const PriceListPage = lazy(() => import('../pages/user/PriceListPage'));
const NewsPage = lazy(() => import('../pages/user/post/NewsPage'));
const PostDetail = lazy(() => import('../pages/user/post/PostDetail'));
const TipsAndTricksPage = lazy(
  () => import('../pages/user/post/TipsAndTricksPage')
);
const GalleryPage = lazy(() => import('../pages/user/GalleryPage'));
// admin
const Admin = lazy(() => import('../pages/admin/Admin'));
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const PhoneCatalogManager = lazy(
  () => import('../pages/admin/PhoneCatalogManager')
);
const PhoneManager = lazy(() => import('../pages/admin/PhoneManager'));

// post
const Post = lazy(() => import('../pages/admin/post/Post'));
const PostManagerPage = lazy(
  () => import('../pages/admin/post/PostManagerPage')
);
const PostCatalogManagerPage = lazy(
  () => import('../pages/admin/post/PostCatalogManagerPage')
);

// gallery
const Gallery = lazy(() => import('../pages/admin/gallery/Gallery'));
const GalleryManagerPage = lazy(
  () => import('../pages/admin/gallery/GalleryManagerPage')
);

// sitemap.xml
const SiteMapPage = lazy(() => import('../pages/user/SiteMapPage'));

// not found page
const NotFound = lazy(() => import('../pages/404/NotFound'));
// --------------------------------------------------------------------------------------------------------------------
// OnPage SEO
const HomePageSEO = () => {
  useSeo({
    title:
      '7Teck.vn - Điện thoại, Máy tính bảng, Laptop, PC, Apple chính hãng, Thu cũ đổi mới - Hỗ trợ giá lên đời',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: 'Khám phá các sản phẩm công nghệ mới nhất tại 7Teck.'
      },
      { name: 'keywords', content: '7Teck, công nghệ, điện thoại, laptop' }
    ]
  });
  return <HomePage />;
};
// NewsPageSEO
const NewsPageSEO = () => {
  useSeo({
    title: 'Tin tức mới nhất tại 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <NewsPage />;
};
// PostDetailSEO
const PostDetailSEO = () => {
  const { posts } = useContext(PostContext);
  const { title } = useParams<{ title: string }>();
  const [selectedPost, setSelectedPost] = useState<(typeof posts)[0] | null>(
    null
  );
  useEffect(() => {
    // Fetch Data By Title
    if (posts.length > 0 && title) {
      const post = posts.find(
        post =>
          post?.title.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
      );
      setSelectedPost(post || null);
    }
  }, [selectedPost, posts, title]);

  useSeo({
    title: `${selectedPost?.title} - 7Teck`,
    canonical: selectedPost
      ? `${window.location.origin}/tin-tuc/${selectedPost.title.toLowerCase().replace(/\s+/g, '-')}`
      : window.location.href,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <PostDetail />;
};
// TipsAndTricksPageSEO
const TipsAndTricksPageSEO = () => {
  useSeo({
    title: 'Thủ Thuật Công Nghệ Và Mẹo Hay',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <TipsAndTricksPage />;
};
// ContactPageSEO
const ContactPageSEO = () => {
  useSeo({
    title: 'Chính Sách Bảo Hành - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <ContactPage />;
};
// GalleryPageSEO
const GalleryPageSEO = () => {
  useSeo({
    title: 'Hành Trình Khách Hàng',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <GalleryPage />;
};
// PriceListPageSEO
const PriceListPageSEO = () => {
  useSeo({
    title: 'Bảng Giá Thu Mua - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <PriceListPage />;
};
// PhonePageSEO
const PhonePageSEO = () => {
  useSeo({
    title: 'Điện Thoại iPhone - 7Teck',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, tin tức, điện thoại, laptop' }
    ]
  });
  return <PhonePage />;
};
// PhoneByCatalogPageSEO
const PhoneByCatalogPageSEO = () => {
  const { phones } = useContext(PhoneContext);
  const { catalog } = useParams();
  const slugify = (text: string) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  const filteredPhones = phones.filter(
    phone => slugify(phone?.name) === catalog
  );
  useSeo({
    title:
      filteredPhones.length > 0
        ? `${filteredPhones[0]?.name}`
        : 'Không tìm thấy sản phẩm!',
    canonical: `${window.location.href}`,
    meta: [
      {
        name: 'description',
        content: ''
      },
      { name: 'keywords', content: '7Teck, điện thoại, laptop, máy tính bảng' }
    ]
  });
  return <PhoneByCatalogPage />;
};
// PhoneDetailPageSEO
const PhoneDetailPageSEO = () => {
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
};
export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* UserPage  */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<User />}>
            <Route index path="" element={<HomePageSEO />} />
            {/*  */}
            <Route path="iphone" element={<PhonePageSEO />} />
            <Route path="iphone/:catalog" element={<PhoneByCatalogPageSEO />} />
            <Route
              path="chi-tiet-iphone/:id"
              element={<PhoneDetailPageSEO />}
            />
            {/*  */}
            <Route path="tin-tuc-moi-nhat" element={<NewsPageSEO />} />
            <Route path="tin-tuc/:title" element={<PostDetailSEO />} />
            {/*  */}
            <Route
              path="thu-thuat-va-meo-hay"
              element={<TipsAndTricksPageSEO />}
            />
            <Route path="hanh-trinh-khach-hang" element={<GalleryPageSEO />} />
            <Route path="bang-gia-thu-mua" element={<PriceListPageSEO />} />
            <Route path="chinh-sach-bao-hanh" element={<ContactPageSEO />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<DefaultLayout />}>
          <Route path="/admin" element={<Admin />}>
            <Route index path="" element={<DashboardPage />} />
            <Route
              path="phone-catalog-manager"
              element={<PhoneCatalogManager />}
            />
            <Route path="phone-manager" element={<PhoneManager />} />
          </Route>
        </Route>

        {/* Post */}
        <Route element={<DefaultLayout />}>
          <Route path="/admin-post" element={<Post />}>
            {/* <Route index path="" element={<DashboardPage />} /> */}
            <Route path="post-manager" element={<PostManagerPage />} />
            <Route
              path="post-catalog-manager"
              element={<PostCatalogManagerPage />}
            />
          </Route>
        </Route>

        {/* Gallery */}
        <Route element={<DefaultLayout />}>
          <Route path="/admin-gallery" element={<Gallery />}>
            <Route index path="" element={<GalleryManagerPage />} />
            <Route path="gallery-manager" element={<GalleryManagerPage />} />
          </Route>
        </Route>
        {/* SiteMap */}
        <Route element={<DefaultLayout />}>
          <Route path="/sitemap.xml" element={<SiteMapPage />} />
        </Route>
        {/* 404 not found */}
        <Route element={<DefaultLayout />}>
          <Route errorElement={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
