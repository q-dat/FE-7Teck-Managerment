import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';

// UserPage
const User = lazy(() => import('../pages/user/User'));
const HomePageSEO = lazy(() => import('../SEO/HomePageSEO'));
const ContactPageSEO = lazy(() => import('../SEO/ContactPageSEO'));
const PhonePageSEO = lazy(() => import('../SEO/PhonePageSEO'));
const PhoneByCatalogPageSEO = lazy(
  () => import('../SEO/PhoneByCatalogPageSEO')
);
const PhoneDetailPageSEO = lazy(() => import('../SEO/PhoneDetailPageSEO'));
const PriceListPageSEO = lazy(() => import('../SEO/PriceListPageSEO'));
const NewsPageSEO = lazy(() => import('../SEO/NewsPageSEO'));
const PostDetailSEO = lazy(() => import('../SEO/PostDetailSEO'));
const TipsAndTricksPageSEO = lazy(() => import('../SEO/TipsAndTricksPageSEO'));
const GalleryPageSEO = lazy(() => import('../SEO/GalleryPageSEO'));

// admin
const Admin = lazy(() => import('../cms/admin/Admin'));
const DashboardPage = lazy(() => import('../cms/admin/DashboardPage'));
const PhoneCatalogManager = lazy(
  () => import('../cms/admin/PhoneCatalogManager')
);
const PhoneManager = lazy(() => import('../cms/admin/PhoneManager'));

// post
const Post = lazy(() => import('../cms/admin/post/Post'));
const PostManagerPage = lazy(() => import('../cms/admin/post/PostManagerPage'));
const PostCatalogManagerPage = lazy(
  () => import('../cms/admin/post/PostCatalogManagerPage')
);

// gallery
const Gallery = lazy(() => import('../cms/admin/gallery/Gallery'));
const GalleryManagerPage = lazy(
  () => import('../cms/admin/gallery/GalleryManagerPage')
);

// not found page
const NotFound = lazy(() => import('../pages/404/NotFound'));

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
          <Route path="/cms/admin" element={<Admin />}>
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
          <Route path="/cms/admin-post" element={<Post />}>
            <Route index path="" element={<PostManagerPage />} />
            <Route path="post-manager" element={<PostManagerPage />} />
            <Route
              path="post-catalog-manager"
              element={<PostCatalogManagerPage />}
            />
          </Route>
        </Route>

        {/* Gallery */}
        <Route element={<DefaultLayout />}>
          <Route path="/cms/admin-gallery" element={<Gallery />}>
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
