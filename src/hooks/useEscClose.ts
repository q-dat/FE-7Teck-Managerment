import { useEffect } from 'react';

/**
 * Hook đóng modal khi nhấn phím ESC
 * @param isOpen Modal đang mở
 * @param onClose Hàm đóng modal
 */
export function useEscClose(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
}

