import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductsSearch } from '../../api/Api';
import ProductCard from './ProductCard';

const SearchResultPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = new URLSearchParams(useLocation().search);
    const query = searchParams.get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (query) {
                setIsLoading(true);
                try {
                    const data = await getProductsSearch(query); // Lấy dữ liệu từ API
                    setProducts(data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
                setIsLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="search-results-page">
            <h2>Kết quả tìm kiếm cho "{query}"</h2>
            {isLoading ? (
                <p>Đang tải...</p>
            ) : (
                <div className="grid__row">
                    {products.length > 0 ? (
                        products.map((product) => <ProductCard key={product.id} product={product} />)
                    ) : (
                        <p>Không có sản phẩm nào phù hợp.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResultPage;
