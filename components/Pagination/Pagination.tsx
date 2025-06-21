'use client';

import css from './Pagination.module.css';

export interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
}

function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <nav className={css.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={css.pageButton}
      >
        ←
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${css.pageButton} ${page === currentPage ? css.active : ''}`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className={css.pageButton}
      >
        →
      </button>
    </nav>
  );
}

export default Pagination; 