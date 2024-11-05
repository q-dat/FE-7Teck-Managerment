import React from 'react';
import { Button } from 'react-daisyui';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <Button disabled={currentPage === 1} onClick={onPrevPage}>
        Trang Trước
      </Button>
      <span className="mx-2">
        Trang {currentPage} / {totalPages}
      </span>
      <Button disabled={currentPage === totalPages} onClick={onNextPage}>
        Trang Tiếp
      </Button>
    </div>
  );
};

export default Pagination;
