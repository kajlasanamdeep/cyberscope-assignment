import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  flex-wrap: wrap;
`;

const ButtonBase = styled.button`
  padding: 8px 12px;
  min-width: 36px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #0f172a;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.05s ease;
  &:hover:not(:disabled) {
    background: #f8fafc;
    border-color: #d1d5db;
  }
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
    background: #f9fafb;
  }
  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

const EdgeButton = styled(ButtonBase)`
  background: #f8fafc;
`;

const PageButton = styled(ButtonBase)`
  ${(p) =>
    p.$active
      ? `
    background: #111827;
    color: #ffffff;
    border-color: #111827;
    cursor: default;
  `
      : ''}
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  gap: 6px;
  align-items: center;
`;

const Item = styled.li``;

const Ellipsis = styled.li`
  padding: 6px 10px;
  min-width: 28px;
  text-align: center;
  color: #64748b;
`;

const Current = styled.span`
  padding: 6px 10px;
  color: #334155;
`;

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
      <Container aria-label="Pagination">
        <ButtonBase
          onClick={handlePrev}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          ← Prev
        </ButtonBase>

        <Current>Page {page}</Current>

        <ButtonBase
          onClick={handleNext}
          aria-label="Next page"
        >
          Next →
        </ButtonBase>
      </Container>
    );
  }

  return (
    <Container aria-label="Pagination Navigation">
      <EdgeButton
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        aria-label="First page"
      >
        « First
      </EdgeButton>

      <ButtonBase
        onClick={handlePrev}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ‹ Prev
      </ButtonBase>

      <List>
        {paginationRange.map((p, idx) => {
          if (p === 'LEFT_ELLIPSIS' || p === 'RIGHT_ELLIPSIS') {
            return (
              <Ellipsis key={`${p}-${idx}`} aria-hidden>
                …
              </Ellipsis>
            );
          }

          const isActive = p === page;
          return (
            <Item key={p}>
              <PageButton
                onClick={() => onClickPage(p)}
                aria-current={isActive ? 'page' : undefined}
                $active={isActive}
                disabled={isActive}
              >
                {p}
              </PageButton>
            </Item>
          );
        })}
      </List>

      <ButtonBase
        onClick={handleNext}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        Next ›
      </ButtonBase>

      <EdgeButton
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
        aria-label="Last page"
      >
        Last »
      </EdgeButton>
    </Container>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number,
  siblingCount: PropTypes.number
};
