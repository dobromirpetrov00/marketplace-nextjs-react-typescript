/**
 * A React component that renders a pagination UI for navigating through multiple pages of content.
 *
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 * @param onPageChange - A callback function that is called when the user clicks on a page number or the previous/next buttons. The function is called with the new page number as an argument.
 */
import React from 'react';
import styles from '../styles/Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button className={styles['page-nav']} onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>

      <div>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`${styles['page-number']} ${currentPage === index + 1 ? styles.active : ''}`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button className={styles['page-nav']} onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
