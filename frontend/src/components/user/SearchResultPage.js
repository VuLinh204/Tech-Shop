/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProductsSearch, getProductsByCategory, getCategories } from '../../api/Api';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';

const SearchResultPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeCategoryId, setActiveCategoryId] = useState(
        localStorage.getItem('activeCategoryId') ? localStorage.getItem('activeCategoryId') : null,
    );
    const searchParams = new URLSearchParams(useLocation().search);
    const query = searchParams.get('query');
    const categoryId = searchParams.get('categoryId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                let data;
                if (categoryId) {
                    const categoryIdNumber = Number(categoryId);
                    data = await getProductsByCategory([categoryIdNumber]);
                } else if (query) {
                    localStorage.removeItem('activeCategoryId');
                    setActiveCategoryId(null);
                    data = await getProductsSearch(query);
                }
                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                setError('Có lỗi xảy ra khi tải sản phẩm.');
                console.error('Error fetching products:', error);
            }
            setIsLoading(false);
        };
        fetchProducts();
    }, [query, categoryId]);

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

    const handleCategoryClick = (id) => {
        setActiveCategoryId(id);
        localStorage.setItem('activeCategoryId', id);
        navigate(`?categoryId=${id}`);
    };

    return (
        <div className="search-results-page">
            <h2>{query ? `Kết quả tìm kiếm cho "${query}"` : 'Sản phẩm theo danh mục'}</h2>
            {error && <p>{error}</p>}
            {isLoading ? (
                <p>Đang tải...</p>
            ) : (
                <div className="grid">
                    <div className="grid__row app__content">
                        <div className="grid__column-2">
                            <nav className="manager">
                                <h3 className="manager__heading">Danh mục</h3>

                                <ul className="manager-list">
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <li key={category.original_id} className="manager-item">
                                                <a
                                                    href={`#`}
                                                    className={`manager-item__link ${
                                                        activeCategoryId === category.original_id ? 'active' : ''
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleCategoryClick(category.original_id);
                                                    }}
                                                >
                                                    {category.name}
                                                </a>
                                            </li>
                                        ))
                                    ) : (
                                        <p> Không có danh mục nào </p>
                                    )}
                                </ul>
                            </nav>
                        </div>

                        <div className="grid__column-10">
                            <ProductFilter />

                            <div className="home__product">
                                <div className="grid__row">
                                    {/* Product item */}
                                    {products.length > 0 ? (
                                        products.map((product) => {
                                            return <ProductCard key={product.id} product={product} />;
                                        })
                                    ) : (
                                        <p>Không có sản phẩm nào phù hợp.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResultPage;
