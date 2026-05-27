/**
 * Pagination Component
 * Props:
 *  - currentPage: number (1-based)
 *  - totalPages: number
 *  - onPageChange: (page: number) => void
 *  - showInfo: boolean — tampilkan "Halaman X dari Y"
 *  - siblingCount: number — jumlah halaman di kiri/kanan halaman aktif
 */

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  siblingCount = 1,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const DOTS = "...";

  // Hitung halaman yang ditampilkan
  const buildPages = () => {
    const total = 2 * siblingCount + 5; // siblings + first + last + 2 dots + current
    if (totalPages <= total) return range(1, totalPages);

    const leftSibling  = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots  = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + 2 * siblingCount);
      return [...leftRange, DOTS, totalPages];
    }
    if (showLeftDots && !showRightDots) {
      const rightRange = range(totalPages - (3 + 2 * siblingCount) + 1, totalPages);
      return [1, DOTS, ...rightRange];
    }
    return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, totalPages];
  };

  const pages = buildPages();

  const btnBase =
    "w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-150";

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {showInfo && (
        <span className="text-xs text-gray-400 mr-2">
          Halaman {currentPage} dari {totalPages}
        </span>
      )}

      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} border border-gray-200 text-gray-500
          hover:border-[#1A7C6E] hover:text-[#1A7C6E]
          disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <FaChevronLeft className="text-xs" />
      </button>

      {/* Pages */}
      {pages.map((page, idx) =>
        page === DOTS ? (
          <span key={`dots-${idx}`} className={`${btnBase} text-gray-400`}>
            ···
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${btnBase} ${
              currentPage === page
                ? "bg-[#1A7C6E] text-white shadow-sm"
                : "border border-gray-200 text-gray-600 hover:border-[#1A7C6E] hover:text-[#1A7C6E]"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} border border-gray-200 text-gray-500
          hover:border-[#1A7C6E] hover:text-[#1A7C6E]
          disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <FaChevronRight className="text-xs" />
      </button>
    </div>
  );
}
