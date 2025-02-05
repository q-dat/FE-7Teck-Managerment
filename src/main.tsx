import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import ErrorBoundary from './components/orther/error/ErrorBoundary.tsx';
import LoadingPage from './pages/LoadingPage/LoadingPage.tsx';
import { PhoneCatalogProvider } from './context/phone-catalog/PhoneCatalogContext.tsx';
import { PhoneProvider } from './context/phone/PhoneContext.tsx';
import { PostProvider } from './context/post/PostContext.tsx';
import { ToastContainer } from 'react-toastify';
import { ParallaxProvider } from 'react-scroll-parallax';
import { GalleryProvider } from './context/gallery/GalleryContext.tsx';
import { PostCatalogProvider } from './context/post-catalog/PostCatalogContext.tsx';
import { Analytics } from "@vercel/analytics/react"
const App = lazy(() => import('./App.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingPage loading={true} />}>
        <ErrorBoundary>
          <GalleryProvider>
            <PostCatalogProvider>
              <PostProvider>
                <PhoneCatalogProvider>
                  <PhoneProvider>
                    <ParallaxProvider>
                      <App />
                      <Analytics/>
                      <ToastContainer />
                    </ParallaxProvider>
                  </PhoneProvider>
                </PhoneCatalogProvider>
              </PostProvider>
            </PostCatalogProvider>
          </GalleryProvider>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
