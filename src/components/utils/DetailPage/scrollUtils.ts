export const scrollBy = (
  scrollRef: React.RefObject<HTMLDivElement>,
  offset: number
) => {
    if (scrollRef.current) {
        scrollRef.current.scrollLeft += offset;
      }
    };

export const updateScrollButtons = (
  scrollRef: React.RefObject<HTMLDivElement>,
  setIsLeftVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsRightVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const scrollContainer = scrollRef.current;
  if (scrollContainer) {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
    setIsLeftVisible(scrollLeft > 0);
    setIsRightVisible(scrollLeft + clientWidth < scrollWidth - 1);
  }
};

export const handleThumbnailClick = (
  scrollRef: React.RefObject<HTMLDivElement>,
  thumb: string,
  index: number,
  setSelectedImage: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >
) => {
  setSelectedImage(thumb);
  const scrollContainer = scrollRef.current;
  if (scrollContainer) {
    const thumbnailElement = scrollContainer.children[index] as HTMLElement;
    if (thumbnailElement) {
      const containerWidth = scrollContainer.offsetWidth;
      const elementOffsetLeft = thumbnailElement.offsetLeft;
      const elementWidth = thumbnailElement.offsetWidth;

      // Tính toán vị trí cần scroll sao cho ảnh nằm ở giữa
      const scrollPosition =
        elementOffsetLeft - (containerWidth - elementWidth) / 2;
      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }
};

export const handleScrollButtons = (
  scrollRef: React.RefObject<HTMLDivElement>,
  phonesLength: number,
  updateScrollButtons: () => void
) => {
  if (phonesLength > 0) updateScrollButtons();
  const handleResize = () => updateScrollButtons();
  const scrollContainer = scrollRef.current;

  window.addEventListener('resize', handleResize);
  scrollContainer?.addEventListener('scroll', updateScrollButtons);

  return () => {
    window.removeEventListener('resize', handleResize);
    scrollContainer?.removeEventListener('scroll', updateScrollButtons);
  };
};
