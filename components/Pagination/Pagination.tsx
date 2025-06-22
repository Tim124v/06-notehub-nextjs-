'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage: number;
}

function Pagination({ pageCount, onPageChange, forcePage }: PaginationProps) {
  return (
    <ReactPaginate
      previousLabel={'←'}
      nextLabel={'→'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      forcePage={forcePage}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      breakClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousLinkClassName={css.pageLink}
      nextLinkClassName={css.pageLink}
      breakLinkClassName={css.pageLink}
      disabledClassName={css.disabled}
    />
  );
}

export default Pagination; 