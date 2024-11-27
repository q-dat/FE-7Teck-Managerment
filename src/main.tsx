import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/orther/error/ErrorBoundary.tsx';
import LoadingPage from './pages/LoadingPage/LoadingPage.tsx';
import { PhoneProvider } from './context/PhoneContext.tsx';
import { PostProvider } from './context/PostContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingPage loading={true} />}>
        <ErrorBoundary>
          <PostProvider>
            <PhoneProvider>
              <App />
            </PhoneProvider>
          </PostProvider>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
