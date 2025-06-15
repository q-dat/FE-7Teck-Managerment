import { useEffect, useRef, useState, useCallback } from 'react';

export const useScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setIsLeftVisible(scrollLeft > 0);
      setIsRightVisible(scrollLeft + clientWidth < scrollWidth - 1);
      setHasOverflow(scrollWidth > clientWidth);
    }
  }, []);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
      updateScrollButtons();
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Gọi lại sau khi layout xong
    const frame = requestAnimationFrame(() => {
      updateScrollButtons();
    });

    // Cập nhật lại khi resize hoặc scroll
    const handleResize = () => updateScrollButtons();
    scrollContainer.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', handleResize);

    // Observer theo dõi mọi thay đổi trong DOM children
    const observer = new MutationObserver(() => {
      updateScrollButtons();
    });
    observer.observe(scrollContainer, {
      childList: true,
      subtree: true
    });

    return () => {
      cancelAnimationFrame(frame);
      scrollContainer.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [updateScrollButtons]);

  return {
    scrollRef,
    isLeftVisible,
    isRightVisible,
    hasOverflow,
    scrollBy
  };
};

