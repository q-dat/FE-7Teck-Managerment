import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/auth/LoginPage';

// UserPage
// const User = lazy(() => import('../pages/user/User'));
// const HomePage = lazy(() => import('../pages/user/HomePage/HomePage'));
// const WarrantyPage = lazy(() => import('../pages/user/WarrantyPage'));
// const PurchasePage = lazy(() => import('../pages/user/PurchasePage'));
// const PhonePage = lazy(() => import('../pages/user/ProductsPage/PhonePage'));
// const TabletPage = lazy(() => import('../pages/user/ProductsPage/TabletPage'));
// const MacbookPage = lazy(() => import('../pages/user/ProductsPage/MacbookPage'));
// const WindowsPage = lazy(() => import('../pages/user/ProductsPage/WindowsPage'));
// const PriceListPage = lazy(() => import('../pages/user/PriceListPage'));
// const NewsPage = lazy(() => import('../pages/user/PostPage/NewsPage'));
// const PostDetail = lazy(() => import('../pages/user/PostPage/PostDetail'));
// const TipsAndTricksPage = lazy(() => import('../pages/user/PostPage/TipsAndTricksPage'));
// const GalleryPage = lazy(() => import('../pages/user/GalleryPage'));
// //----------------------------------------------------------------
// const UsedProductsPage = lazy(() => import('../pages/user/UsedProductsPage/UsedProductsPage'));
// const UsedPhoneByCatalogPage = lazy(() => import('../pages/user/usedProductsByCatalog/UsedPhoneByCatalogPage'));
// const UsedTabletByCatalogPage = lazy(() => import('../pages/user/usedProductsByCatalog/UsedTabletByCatalogPage'));
// const UsedMacbookByCatalogPage = lazy(() => import('../pages/user/usedProductsByCatalog/UsedMacbookByCatalogPage'));
// const UsedWindowsByCatalogPage = lazy(() => import('../pages/user/usedProductsByCatalog/UsedWindowsByCatalogPage'));
// //
// const PhoneDetailPage = lazy(() => import('../pages/user/DetailsPage/PhoneDetailPage'));
// const TabletDetailPage = lazy(() => import('../pages/user/DetailsPage/TabletDetailPage'));
// const WindowsDetailPage = lazy(() => import('../pages/user/DetailsPage/WindowsDetailPage'));
// const MacbookDetailPage = lazy(() => import('../pages/user/DetailsPage/MacbookDetailPage'));

// admin
const Admin = lazy(() => import('../cms/admin/Admin'));
const DashboardPage = lazy(() => import('../cms/admin/DashboardPage'));
const PhoneCatalogManager = lazy(() => import('../cms/admin/PhoneCatalogManager'));
const PhoneManager = lazy(() => import('../cms/admin/PhoneManager'));

const TabletCatalogManager = lazy(() => import('../cms/admin/TabletCatalogManager'));
const TabletManager = lazy(() => import('../cms/admin/TabletManager'));
const MacbookCatalogManager = lazy(() => import('../cms/admin/MacbookCatalogManager'));
const MacbookManager = lazy(() => import('../cms/admin/MacbookManager'));
const WindowsCatalogManager = lazy(() => import('../cms/admin/WindowsCatalogManager'));
const WindowsManager = lazy(() => import('../cms/admin/WindowsManager'));

// post
const Post = lazy(() => import('../cms/post/Post'));
const PostManagerPage = lazy(() => import('../cms/post/PostManagerPage'));
const PostCatalogManagerPage = lazy(() => import('../cms/post/PostCatalogManagerPage'));
const PriceListManagerPage = lazy(() => import('../cms/post/PriceListManagerPage'));

// gallery
const Gallery = lazy(() => import('../cms/gallery/Gallery'));
const GalleryManagerPage = lazy(() => import('../cms/gallery/GalleryManagerPage'));

// not found page
const NotFound = lazy(() => import('../pages/404/NotFound'));

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* UserPage  */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<LoginPage />}>
            {/* <Route index path="" element={<HomePage />} /> */}
            {/*  */}
            {/* <Route path="dien-thoai" element={<PhonePage />} />
            <Route path="may-tinh-bang" element={<TabletPage />} />
            <Route path="macbook" element={<MacbookPage />} />
            <Route path="windows" element={<WindowsPage />} /> */}
            {/* Used Products */}
            {/* <Route path="thiet-bi-da-qua-su-dung" element={<UsedProductsPage />} />
            <Route path="dien-thoai/:catalog" element={<UsedPhoneByCatalogPage />} />
            <Route path="may-tinh-bang/:catalog" element={<UsedTabletByCatalogPage />} />
            <Route path="macbook/:catalog" element={<UsedMacbookByCatalogPage />} />
            <Route path="windows/:catalog" element={<UsedWindowsByCatalogPage />} /> */}
            {/*  */}
            {/* <Route path="dien-thoai/:catalog/:id" element={<PhoneDetailPage />} />
            <Route path="dien-thoai/:name/:id" element={<PhoneDetailPage />} />
            <Route path="may-tinh-bang/:name/:id" element={<TabletDetailPage />} />
            <Route path="windows/:name/:id" element={<WindowsDetailPage />} />
            <Route path="macbook/:name/:id" element={<MacbookDetailPage />} /> */}
            {/*  */}
            {/* <Route path="tin-tuc-moi-nhat" element={<NewsPage />} />
            <Route path="tin-tuc/:title/:id" element={<PostDetail />} /> */}
            {/*  */}
            {/* <Route path="thu-thuat-va-meo-hay" element={<TipsAndTricksPage />} />
            <Route path="thanh-toan" element={<PurchasePage />} />
            <Route path="hanh-trinh-khach-hang" element={<GalleryPage />} />
            <Route path="bang-gia-thu-mua" element={<PriceListPage />} />
            <Route path="chinh-sach-bao-hanh" element={<WarrantyPage />} /> */}
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<DefaultLayout />}>
          <Route
            path="/cms/admin/*"
            element={
              <PrivateRoute requiredRole="admin">
                <Admin />
              </PrivateRoute>
            }
          >
            <Route index path="" element={<DashboardPage />} />
            <Route path="phone-catalog-manager" element={<PhoneCatalogManager />} />
            <Route path="phone-manager" element={<PhoneManager />} />
            <Route path="tablet-catalog-manager" element={<TabletCatalogManager />} />
            <Route path="tablet-manager" element={<TabletManager />} />
            <Route path="macbook-catalog-manager" element={<MacbookCatalogManager />} />
            <Route path="macbook-manager" element={<MacbookManager />} />
            <Route path="windows-catalog-manager" element={<WindowsCatalogManager />} />
            <Route path="windows-manager" element={<WindowsManager />} />
          </Route>
        </Route>

        {/* Post */}
        <Route element={<DefaultLayout />}>
          <Route
            path="/cms/admin-post/*"
            element={
              <PrivateRoute requiredRole="admin">
                <Post />
              </PrivateRoute>
            }
          >
            <Route index path="" element={<PostManagerPage />} />
            <Route path="post-manager" element={<PostManagerPage />} />
            <Route path="post-catalog-manager" element={<PostCatalogManagerPage />} />{' '}
            <Route path="price-list-manager" element={<PriceListManagerPage />} />
          </Route>
        </Route>

        {/* Gallery */}
        <Route element={<DefaultLayout />}>
          <Route
            path="/cms/admin-gallery/*"
            element={
              <PrivateRoute requiredRole="admin">
                <Gallery />
              </PrivateRoute>
            }
          >
            <Route index path="" element={<GalleryManagerPage />} />
            <Route path="gallery-manager" element={<GalleryManagerPage />} />
          </Route>
        </Route>

        {/* Login */}
        <Route element={<DefaultLayout />}>
          <Route path="auth" element={<LoginPage />} />
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
