import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';

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
const Post = lazy(() => import('../pages/post/Post'));
const PostManagerPage = lazy(
  () => import('../pages/admin/post/PostManagerPage')
);

// gallery
const Gallery = lazy(() => import('../pages/gallery/Gallery'));
const GalleryManagerPage = lazy(
  () => import('../pages/admin/gallery/GalleryManagerPage')
);

// not found page
const NotFound = lazy(() => import('../pages/404/NotFound'));
export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* User page  */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<User />}>
            <Route index path="" element={<HomePage />} />
            <Route path="iphone" element={<PhonePage />} />
            <Route path="iphone/:catalog" element={<PhoneByCatalogPage />} />
            <Route path="chi-tiet-iphone/:id" element={<PhoneDetailPage />} />
            <Route path="tin-tuc-moi-nhat" element={<NewsPage />} />
            <Route path="tin-tuc/:title" element={<PostDetail />} />
            <Route
              path="thu-thuat-va-meo-hay"
              element={<TipsAndTricksPage />}
            />
            <Route path="hanh-trinh" element={<GalleryPage />} />
            <Route path="bang-gia-thu-mua" element={<PriceListPage />} />
            <Route path="chinh-sach-bao-hanh" element={<ContactPage />} />
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
          </Route>
        </Route>

        {/* Gallery */}
        <Route element={<DefaultLayout />}>
          <Route path="/admin-gallery" element={<Gallery />}>
            <Route index path="" element={<GalleryManagerPage />} />
            <Route path="gallery-manager" element={<GalleryManagerPage />} />
          </Route>
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
