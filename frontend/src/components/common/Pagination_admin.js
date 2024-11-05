import React from "react";
import PropTypes from "prop-types";
import "../../assets/css/Pagination_admin.css";

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  onPageChange, // Callback function when the page changes
}) => {
  if (totalPages <= 1) return null; // Don't render pagination if there's only one page

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      if (onPageChange) onPageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      if (onPageChange) onPageChange(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };

  return (
    <div className="pagination_admin">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        &lt; {/* Thay thế "Previous" bằng "<" */}
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <a
          key={i}
          href="javascript:void(0)"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(i + 1);
          }}
          className={`page-number ${i + 1 === currentPage ? "active" : ""}`} // Thêm lớp 'page-number' cho các số trang
          role="button"
          aria-current={i + 1 === currentPage ? "page" : undefined}
        >
          {i + 1}
        </a>
      ))}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        &gt; {/* Thay thế "Next" bằng ">" */}
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  onPageChange: PropTypes.func,
};

export default Pagination;
