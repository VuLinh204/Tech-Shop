import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../api/Api';
import '../../assets/css/CategoryList.css';

const CategoryList = ({ setProducts, productsPerPage = 12 }) => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategoryId, setActiveCategoryId] = useState(
        localStorage.getItem('activeCategoryId') ? localStorage.getItem('activeCategoryId') : null,
    );
    const itemsPerPage = productsPerPage;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.log('Lỗi lấy danh mục: ', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        localStorage.removeItem('activeCategoryId');
        localStorage.setItem('activeCategoryId', categoryId);
        setActiveCategoryId(categoryId);

        const productSection = document.getElementById('product-section');
        if (productSection) {
            productSection.scrollIntoView({ behavior: 'smooth' });
        }
        navigate(`/product/searchResult/?categoryId=${categoryId}`);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const visibleCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="home__category">
            <div className="home__category-item-list">
                <div className="home__category-row">
                    {visibleCategories.map((category) => (
                        <div
                            key={category.original_id}
                            className="home__category-item"
                            onClick={() => handleCategoryClick(category.original_id)}
                        >
                            <div
                                className="home__category-image"
                                style={{
                                    backgroundImage: `url(http://localhost/tech-shop/backend/public/uploads/${category.thumbnail})`,
                                }}
                            />
                            <div className="home__category-name">{category.name}</div>
                        </div>
                    ))}
                </div>

                {/* Nút phân trang */}
                <div className="pagination">
                    <button
                        className="pagination-button prev-button"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        {'<'}
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <span key={page} className={`page-dot ${page === currentPage ? 'active' : ''}`} />
                    ))}

                    <button
                        className="pagination-button next-button"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
