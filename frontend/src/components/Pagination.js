import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
                <a
                    key={i}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(i + 1);
                    }}
                    className={i + 1 === currentPage ? 'active' : ''}
                >
                    {i + 1}
                </a>
            ))}
        </div>
    );
};

export default Pagination;
