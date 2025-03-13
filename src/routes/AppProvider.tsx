import { ReactNode } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/auth/AuthContext';
import { GalleryProvider } from '../context/gallery/GalleryContext';
import { MacbookCatalogProvider } from '../context/macbook-catalog/MacbookCatalogContext';
import { MacbookProvider } from '../context/macbook/MacbookContext';
import { OptionPhoneProvider } from '../context/optionsData/OptionsPhoneContext';
import { PhoneCatalogProvider } from '../context/phone-catalog/PhoneCatalogContext';
import { PhoneProvider } from '../context/phone/PhoneContext';
import { PostCatalogProvider } from '../context/post-catalog/PostCatalogContext';
import { PostProvider } from '../context/post/PostContext';
import { PriceListsProvider } from '../context/price-list/PriceListContext';
import { TabletCatalogProvider } from '../context/tablet-catalog/TabletCatalogContext';
import { TabletProvider } from '../context/tablet/TabletContext';
import { WindowsCatalogProvider } from '../context/windows-catalog/WindowsCatalogContext';
import { WindowsProvider } from '../context/windows/WindowsContext';

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
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
                                <ParallaxProvider>{children}</ParallaxProvider>
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
      <ToastContainer />
    </AuthProvider>
  );
};

export default AppProvider;

