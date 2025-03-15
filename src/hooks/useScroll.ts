import { useEffect, useRef, useState, useCallback } from "react";

export const useScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setIsLeftVisible(scrollLeft > 0);
      setIsRightVisible(scrollLeft + clientWidth < scrollWidth - 1);
    }
  }, []);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    updateScrollButtons();

    const handleResize = () => updateScrollButtons();
    scrollContainer.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", handleResize);

    return () => {
      scrollContainer.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScrollButtons]);

  return { scrollRef, isLeftVisible, isRightVisible, scrollBy };
};
