import React from 'react';
import '../assets/css/HomeProduct.css';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import FlashSale from './FlashSale';

function Content() {
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

                        <CategoryList />

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

                        <ProductList />


                        <hr style={{ backgroundColor: 'var(--primary-color)', border: 0, height: '10px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
