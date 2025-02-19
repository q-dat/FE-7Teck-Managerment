import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';

// UserPage
const User = lazy(() => import('../pages/user/User'));
const HomePageSEO = lazy(() => import('../SEO/HomePageSEO'));
const ContactPageSEO = lazy(() => import('../SEO/ContactPageSEO'));
const PhonePageSEO = lazy(() => import('../SEO/PhonePageSEO'));
const TabletPageSEO = lazy(() => import('../SEO/TabletPageSEO'));
const PriceListPageSEO = lazy(() => import('../SEO/PriceListPageSEO'));
const NewsPageSEO = lazy(() => import('../SEO/NewsPageSEO'));
const PostDetailSEO = lazy(() => import('../SEO/PostDetailSEO'));
const TipsAndTricksPageSEO = lazy(() => import('../SEO/TipsAndTricksPageSEO'));
const GalleryPageSEO = lazy(() => import('../SEO/GalleryPageSEO'));
//----------------------------------------------------------------
const UsedProductsPage = lazy(() => import('../pages/user/UsedProductsPage'));
const UsedPhoneByCatalogPageSEO = lazy(
  () => import('../SEO/UsedPhoneByCatalogPageSEO')
);
const PhoneDetailPageSEO = lazy(() => import('../SEO/PhoneDetailPageSEO'));

// admin
const Admin = lazy(() => import('../cms/admin/Admin'));
const DashboardPage = lazy(() => import('../cms/admin/DashboardPage'));
const PhoneCatalogManager = lazy(
  () => import('../cms/admin/PhoneCatalogManager')
);
const PhoneManager = lazy(() => import('../cms/admin/PhoneManager'));

const TabletCatalogManager = lazy(
  () => import('../cms/admin/TabletCatalogManager')
);
const TabletManager = lazy(() => import('../cms/admin/TabletManager'));
const MacbookCatalogManager = lazy(
  () => import('../cms/admin/MacbookCatalogManager')
);
const MacbookManager = lazy(() => import('../cms/admin/MacbookManager'));
const WindowsCatalogManager = lazy(
  () => import('../cms/admin/WindowsCatalogManager')
);
const WindowsManager = lazy(() => import('../cms/admin/WindowsManager'));

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
            <Route path="ipad" element={<TabletPageSEO />} />
            <Route
              path="thiet-bi-da-qua-su-dung"
              element={<UsedProductsPage />}
            />
            <Route
              path="iphone-da-qua-su-dung/:catalog"
              element={<UsedPhoneByCatalogPageSEO />}
            />
            <Route
              path="iphone-da-qua-su-dung/:catalog/:id"
              element={<PhoneDetailPageSEO />}
            />
            <Route path="iphone/:name/:id" element={<PhoneDetailPageSEO />} />
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
            <Route
              path="tablet-catalog-manager"
              element={<TabletCatalogManager />}
            />
            <Route path="tablet-manager" element={<TabletManager />} />
            <Route
              path="macbook-catalog-manager"
              element={<MacbookCatalogManager />}
            />
            <Route path="macbook-manager" element={<MacbookManager />} />
            <Route
              path="windows-catalog-manager"
              element={<WindowsCatalogManager />}
            />
            <Route path="windows-manager" element={<WindowsManager />} />
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
