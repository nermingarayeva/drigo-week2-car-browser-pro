export function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
  
    return (
      <nav className="pagination" aria-label="Səhifələr">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          ← Previous
        </button>
  
        <span className="pagination__status">
         Page {currentPage} / {totalPages}
        </span>
  
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
         Next →
        </button>
      </nav>
    );
  }
  