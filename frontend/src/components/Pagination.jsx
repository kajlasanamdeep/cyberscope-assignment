import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

export default function Pagination({
  page,
  onPageChange,
  totalPages = null,
  siblingCount = 1
}) {
  const createRange = (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  };

  const paginationRange = useMemo(() => {
    if (!totalPages || totalPages <= 1) return [];

    const totalPageNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalPageNumbers) {
      return createRange(1, totalPages);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    const pages = [];

    pages.push(firstPageIndex);

    if (shouldShowLeftDots) {
      pages.push('LEFT_ELLIPSIS');
    } else {
      for (let p = 2; p < leftSiblingIndex; p++) pages.push(p);
    }

    for (let p = leftSiblingIndex; p <= rightSiblingIndex; p++) {
      if (p !== firstPageIndex && p !== lastPageIndex) pages.push(p);
    }

    if (shouldShowRightDots) {
      pages.push('RIGHT_ELLIPSIS');
    } else {
      for (let p = rightSiblingIndex + 1; p < lastPageIndex; p++) pages.push(p);
    }

    if (lastPageIndex !== firstPageIndex) pages.push(lastPageIndex);

    return pages;
  }, [page, totalPages, siblingCount]);

  const onClickPage = (p) => {
    if (p === 'LEFT_ELLIPSIS' || p === 'RIGHT_ELLIPSIS') return;
    if (p === page) return;
    onPageChange(p);
  };

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (!totalPages || page < totalPages) onPageChange(page + 1);
  };

  if (!totalPages) {
    return (
      <div style={styles.container} aria-label="Pagination">
        <button
          onClick={handlePrev}
          disabled={page <= 1}
          style={styles.button}
          aria-label="Previous page"
        >
          ← Prev
        </button>

        <span style={styles.current}>Page {page}</span>

        <button
          onClick={handleNext}
          style={styles.button}
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    );
  }

  return (
    <nav style={styles.container} aria-label="Pagination Navigation">
      <button
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        style={styles.edgeButton}
        aria-label="First page"
      >
        « First
      </button>

      <button
        onClick={handlePrev}
        disabled={page === 1}
        style={styles.button}
        aria-label="Previous page"
      >
        ‹ Prev
      </button>

      <ul style={styles.list}>
        {paginationRange.map((p, idx) => {
          if (p === 'LEFT_ELLIPSIS' || p === 'RIGHT_ELLIPSIS') {
            return (
              <li key={`${p}-${idx}`} style={styles.ellipsis} aria-hidden>
                …
              </li>
            );
          }

          const isActive = p === page;
          return (
            <li key={p} style={styles.item}>
              <button
                onClick={() => onClickPage(p)}
                aria-current={isActive ? 'page' : undefined}
                style={isActive ? styles.activeButton : styles.pageButton}
              >
                {p}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        style={styles.button}
        aria-label="Next page"
      >
        Next ›
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
        style={styles.edgeButton}
        aria-label="Last page"
      >
        Last »
      </button>
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number,
  siblingCount: PropTypes.number
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 0',
    flexWrap: 'wrap'
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    padding: 0,
    margin: 0,
    gap: 6,
    alignItems: 'center'
  },
  item: {},
  ellipsis: {
    padding: '6px 10px',
    minWidth: 28,
    textAlign: 'center'
  },
  button: {
    padding: '6px 10px',
    borderRadius: 6,
    border: '1px solid #ddd',
    background: '#fff',
    cursor: 'pointer'
  },
  edgeButton: {
    padding: '6px 8px',
    borderRadius: 6,
    border: '1px solid #ddd',
    background: '#f7f7f7',
    cursor: 'pointer'
  },
  pageButton: {
    padding: '6px 10px',
    minWidth: 36,
    borderRadius: 6,
    border: '1px solid #ddd',
    background: '#fff',
    cursor: 'pointer'
  },
  activeButton: {
    padding: '6px 10px',
    minWidth: 36,
    borderRadius: 6,
    border: '1px solid #ccc',
    background: '#222',
    color: '#fff',
    cursor: 'default'
  },
  current: {
    padding: '6px 10px'
  }
};
