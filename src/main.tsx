import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/orther/error/ErrorBoundary.tsx';
import LoadingPage from './pages/LoadingPage/LoadingPage.tsx';
import { PhoneCatalogProvider } from './context/phone-catalog/PhoneCatalogContext.tsx';
import { PhoneProvider } from './context/phone/PhoneContext.tsx';
import { PostProvider } from './context/post/PostContext.tsx';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingPage loading={true} />}>
        <ErrorBoundary>
          <PostProvider>
            <PhoneCatalogProvider>
              <PhoneProvider>
                <App />
                <ToastContainer />
              </PhoneProvider>
            </PhoneCatalogProvider>
          </PostProvider>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
