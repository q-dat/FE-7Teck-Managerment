import React, { useState, useEffect } from 'react';
import { Button } from 'react-daisyui';
import { FaCloudMoon } from 'react-icons/fa';
import { MdLightMode } from 'react-icons/md';

const DarkMode: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Button
      size="md"
      onClick={toggleDarkMode}
      className="flex cursor-pointer flex-row items-center justify-center rounded-md border-none bg-transparent shadow-none"
    >
      <div className="cursor-pointer rounded-md">
        {darkMode ? (
          <div className="text-xl text-orange-400">
            <MdLightMode />
          </div>
        ) : (
          <div className="text-xl text-black">
            <FaCloudMoon />
          </div>
        )}
      </div>
    </Button>
  );
};

export default DarkMode;
