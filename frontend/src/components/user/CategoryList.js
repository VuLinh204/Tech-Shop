import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/css/CategoryList.css';

const CategoryList = ({ setProducts, productsPerPage = 12 }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = productsPerPage;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost/Tech-Shop/backend/api/CategoryApi.php');
                setCategories(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = selectedCategory
                    ? `http://localhost/Tech-Shop/backend/api/getProducts.php?category_id=${selectedCategory}`
                    : 'http://localhost/Tech-Shop/backend/api/getProducts.php';

                const response = await axios.get(url);
                let productData = Array.isArray(response.data) ? response.data : [];
                productData.sort((a, b) => (sortOrder === 'desc' ? b.price - a.price : a.price - b.price));
                setProducts(productData);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };
        fetchProducts();
    }, [selectedCategory, sortOrder, setProducts]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        const productSection = document.getElementById('product-section');
        if (productSection) {
            productSection.scrollIntoView({ behavior: 'smooth' });
        }
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
                            key={category.id}
                            className="home__category-item"
                            onClick={() => handleCategoryClick(category.id)}
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
