import React from "react";
import PropTypes from "prop-types";
import "../assets/css/Pagination.css";

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  onPageChange, // Hàm callback để xử lý khi trang thay đổi
}) => {
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    if (onPageChange) onPageChange(currentPage + 1); // Gọi callback
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    if (onPageChange) onPageChange(currentPage - 1); // Gọi callback
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (onPageChange) onPageChange(page); // Gọi callback
  };

  return (
    <div className="pagination">
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <a
          key={i}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(i + 1);
          }}
          className={i + 1 === currentPage ? "active" : ""}
        >
          {i + 1}
        </a>
      ))}
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

// Kiểm tra kiểu dữ liệu cho props
Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  onPageChange: PropTypes.func, // Hàm callback khi trang thay đổi
};

export default Pagination;
