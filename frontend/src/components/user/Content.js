import React, { useState, useRef } from 'react';
import '../../assets/css/HomeProduct.css';
import CategoryList from './CategoryList';
import ProductDisplay from './ProductDisplay'; // Nhập component ProductDisplay
import FlashSale from './FlashSale';
import ProductList from './ProductList';

function Content() {
    const [products, setProducts] = useState([]); // State để lưu sản phẩm
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;
    const productDisplayRef = useRef(null); // Tạo ref cho phần hiển thị sản phẩm

    const handleScrollToProducts = () => {
        if (productDisplayRef.current) {
            productDisplayRef.current.scrollIntoView({ behavior: 'smooth' }); // Cuộn xuống phần hiển thị sản phẩm
        }
    };

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row app__content">
                    <div className="grid__column">
                        <div
                            style={{
                                color: 'var(--primary-color)',
                                fontSize: '3rem',
                                textAlign: 'center',
                                height: '50px',
                            }}
                        >
                            Danh Mục
                        </div>
                        {/* Truyền setProducts, setCurrentPage và handleScrollToProducts */}
                        <CategoryList
                            setProducts={setProducts}
                            setCurrentPage={setCurrentPage}
                            onCategorySelect={handleScrollToProducts}
                        />
                        <div
                            style={{
                                color: 'var(--primary-color)',
                                fontSize: '3rem',
                                textAlign: 'center',
                                height: '50px',
                            }}
                        >
                            Sản Phẩm
                        </div>
                        <div ref={productDisplayRef}>
                            {' '}
                            {/* Gán ref cho phần hiển thị sản phẩm */}
                            <ProductDisplay
                                products={products.slice(
                                    (currentPage - 1) * productsPerPage,
                                    currentPage * productsPerPage,
                                )}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                        <div
                            style={{
                                color: 'var(--primary-color)',
                                fontSize: '3rem',
                                textAlign: 'center',
                                height: '50px',
                            }}
                        >
                            FlashSale
                        </div>
                        <FlashSale />
                        <div
                            style={{
                                color: 'var(--primary-color)',
                                fontSize: '3rem',
                                textAlign: 'center',
                                height: '50px',
                            }}
                        >
                            Gợi ý hôm nay
                        </div>
                        {/* Giả sử bạn có một ProductList khác ở đây */}
                        <ProductList />
                        <hr
                            style={{
                                backgroundColor: 'var(--primary-color)',
                                border: 0,
                                height: '10px',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
