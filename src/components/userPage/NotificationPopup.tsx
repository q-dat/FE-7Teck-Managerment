import React, { useEffect, useState } from 'react';
import { Hero } from 'react-daisyui';
import { Popup } from '../../assets/images';

const NotificationPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    if (!sessionStorage.getItem('popupShown')) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 0);

      const countdown = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            closePopup();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdown);
      };
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('popupShown', 'true');
  };
  return (
    <div>
      {isVisible && (
        <div>
          <section
            className="fixed left-0 top-0 z-[99999] h-full w-full cursor-pointer bg-black bg-opacity-60"
            onClick={closePopup}
          ></section>
          <div className="fixed left-1/2 top-1/2 z-[99999] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-lg xl:w-[500px]">
            <Hero>
              <Hero.Content className="m-0 p-0">
                <div className="relative w-full">
                  <div
                    className="absolute right-1 top-1 flex cursor-pointer flex-row items-center justify-center gap-[2px] rounded-full bg-white px-2 py-[2px] text-sm text-red-500"
                    onClick={closePopup}
                  >
                    <p>Đóng:</p>
                    <p>{secondsLeft}s</p>
                  </div>
                  <img
                    className="h-full w-full rounded-lg object-cover"
                    src={Popup}
                    alt="Greeting"
                  />
                </div>
              </Hero.Content>
            </Hero>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
