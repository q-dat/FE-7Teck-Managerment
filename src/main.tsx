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
import { Analytics } from '@vercel/analytics/react';
import { TabletCatalogProvider } from './context/tablet-catalog/TabletCatalogContext.tsx';
import { TabletProvider } from './context/tablet/TabletContext.tsx';
import { WindowsCatalogProvider } from './context/windows-catalog/WindowsCatalogContext.tsx';
import { WindowsProvider } from './context/windows/WindowsContext.tsx';
import { MacbookCatalogProvider } from './context/macbook-catalog/MacbookCatalogContext.tsx';
import { MacbookProvider } from './context/macbook/MacbookContext.tsx';
import { OptionPhoneProvider } from './context/optionsData/OptionsPhoneContext.tsx';
import { PriceListsProvider } from './context/price-list/PriceListContext.tsx';
const App = lazy(() => import('./App.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingPage loading={true} />}>
        <ErrorBoundary>
          <PriceListsProvider>
            <GalleryProvider>
              <PostCatalogProvider>
                <PostProvider>
                  <PhoneCatalogProvider>
                    <PhoneProvider>
                      <TabletCatalogProvider>
                        <TabletProvider>
                          <WindowsCatalogProvider>
                            <WindowsProvider>
                              <MacbookCatalogProvider>
                                <MacbookProvider>
                                  <OptionPhoneProvider>
                                    <ParallaxProvider>
                                      <App />
                                      <Analytics />
                                      <ToastContainer />
                                    </ParallaxProvider>
                                  </OptionPhoneProvider>
                                </MacbookProvider>
                              </MacbookCatalogProvider>
                            </WindowsProvider>
                          </WindowsCatalogProvider>
                        </TabletProvider>
                      </TabletCatalogProvider>
                    </PhoneProvider>
                  </PhoneCatalogProvider>
                </PostProvider>
              </PostCatalogProvider>
            </GalleryProvider>
          </PriceListsProvider>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
