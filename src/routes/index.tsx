import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/auth/LoginPage';

// UserPage
const User = lazy(() => import('../pages/user/User'));
const HomePageSEO = lazy(() => import('../SEO/HomePageSEO'));
const WarrantyPageSEO = lazy(() => import('../SEO/WarrantyPageSEO'));
const PurchasePageSEO = lazy(() => import('../SEO/PurchasePageSEO'));
const PhonePageSEO = lazy(() => import('../SEO/products/PhonePageSEO'));
const TabletPageSEO = lazy(() => import('../SEO/products/TabletPageSEO'));
const MacbookPageSEO = lazy(() => import('../SEO/products/MacbookPageSEO'));
const WindowsPageSEO = lazy(() => import('../SEO/products/WindowsPageSEO'));
const PriceListPageSEO = lazy(() => import('../SEO/PriceListPageSEO'));
const NewsPageSEO = lazy(() => import('../SEO/post/NewsPageSEO'));
const PostDetailSEO = lazy(() => import('../SEO/post/PostDetailSEO'));
const TipsAndTricksPageSEO = lazy(
  () => import('../SEO/post/TipsAndTricksPageSEO')
);
const GalleryPageSEO = lazy(() => import('../SEO/GalleryPageSEO'));
//----------------------------------------------------------------
const UsedProductsPage = lazy(
  () => import('../pages/user/UsedProductsPage/UsedProductsPage')
);
const UsedPhoneByCatalogPageSEO = lazy(
  () => import('../SEO/usedProductsByCatalog/UsedPhoneByCatalogPageSEO')
);
const UsedTabletByCatalogPageSEO = lazy(
  () => import('../SEO/usedProductsByCatalog/UsedTabletByCatalogPageSEO')
);
const UsedMacbookByCatalogPageSEO = lazy(
  () => import('../SEO/usedProductsByCatalog/UsedMacbookByCatalogPageSEO')
);
const UsedWindowsByCatalogPageSEO = lazy(
  () => import('../SEO/usedProductsByCatalog/UsedWindowsByCatalogPageSEO')
);
//
const PhoneDetailPageSEO = lazy(
  () => import('../SEO/productDetails/PhoneDetailPageSEO')
);
const TabletDetailPageSEO = lazy(
  () => import('../SEO/productDetails/TabletDetailPageSEO')
);
const WindowsDetailPageSEO = lazy(
  () => import('../SEO/productDetails/WindowsDetailPageSEO')
);
const MacbookDetailPageSEO = lazy(
  () => import('../SEO/productDetails/MacbookDetailPageSEO')
);

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
const PriceListManagerPage = lazy(
  () => import('../cms/admin/post/PriceListManagerPage')
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
            <Route path="dien-thoai" element={<PhonePageSEO />} />
            <Route path="may-tinh-bang" element={<TabletPageSEO />} />
            <Route path="macbook" element={<MacbookPageSEO />} />
            <Route path="windows" element={<WindowsPageSEO />} />
            {/* Used Products */}
            <Route
              path="thiet-bi-da-qua-su-dung"
              element={<UsedProductsPage />}
            />
            <Route
              path="dien-thoai/:catalog"
              element={<UsedPhoneByCatalogPageSEO />}
            />
            <Route
              path="may-tinh-bang/:catalog"
              element={<UsedTabletByCatalogPageSEO />}
            />
            <Route
              path="macbook/:catalog"
              element={<UsedMacbookByCatalogPageSEO />}
            />
            <Route
              path="windows/:catalog"
              element={<UsedWindowsByCatalogPageSEO />}
            />
            {/*  */}
            <Route
              path="dien-thoai/:catalog/:id"
              element={<PhoneDetailPageSEO />}
            />
            <Route
              path="dien-thoai/:name/:id"
              element={<PhoneDetailPageSEO />}
            />
            <Route
              path="may-tinh-bang/:name/:id"
              element={<TabletDetailPageSEO />}
            />
            <Route
              path="windows/:name/:id"
              element={<WindowsDetailPageSEO />}
            />
            <Route
              path="macbook/:name/:id"
              element={<MacbookDetailPageSEO />}
            />
            {/*  */}
            <Route path="tin-tuc-moi-nhat" element={<NewsPageSEO />} />
            <Route path="tin-tuc/:title/:id" element={<PostDetailSEO />} />
            {/*  */}
            <Route
              path="thu-thuat-va-meo-hay"
              element={<TipsAndTricksPageSEO />}
            />
            <Route path="thanh-toan" element={<PurchasePageSEO />} />
            <Route path="hanh-trinh-khach-hang" element={<GalleryPageSEO />} />
            <Route path="bang-gia-thu-mua" element={<PriceListPageSEO />} />
            <Route path="chinh-sach-bao-hanh" element={<WarrantyPageSEO />} />
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
            <Route
              path="post-catalog-manager"
              element={<PostCatalogManagerPage />}
            />{' '}
            <Route
              path="price-list-manager"
              element={<PriceListManagerPage />}
            />
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
