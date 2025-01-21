import React from 'react';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <div className='selection:bg-primary selection:text-white'>
      <AppRoutes />
    </div>
  );
};

export default App;
