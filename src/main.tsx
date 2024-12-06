import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/orther/error/ErrorBoundary.tsx';
import LoadingPage from './pages/LoadingPage/LoadingPage.tsx';
import { PhoneProvider } from './context/phone/PhoneContext.tsx';
import { PostProvider } from './context/post/PostContext.tsx';
import { ToastContainer } from 'react-toastify';
import { ChatProvider } from './context/chat/ChatContext.tsx';
import { ChatCatalogProvider } from './context/chat/ChatCatalogContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingPage loading={true} />}>
        <ErrorBoundary>
          <ChatCatalogProvider>
            <ChatProvider>
              <PostProvider>
                <PhoneProvider>
                  <App />
                  <ToastContainer />
                </PhoneProvider>
              </PostProvider>
            </ChatProvider>
          </ChatCatalogProvider>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
