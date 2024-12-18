import React from 'react';

const ProductFilter = ({ selectedCategory }) => {
    const getSortUrl = (sort) => {
        if (selectedCategory) {
            return `/products/by-category/${selectedCategory}?sort=${sort}`;
        }
        return `/products?sort=${sort}`;
    };

    return (
        <div className="home-filter">
            <span className="home-filter__label">Sắp xếp theo</span>
            <button
                className="home-filter__btn btn btn--primary"
                onClick={() => (window.location.href = getSortUrl('popular'))}
            >
                Yêu Thích
            </button>
            <button className="home-filter__btn btn" onClick={() => (window.location.href = getSortUrl('newest'))}>
                Mới nhất
            </button>
            <button
                className="home-filter__btn btn"
                onClick={() => (window.location.href = getSortUrl('best_selling'))}
            >
                Bán chạy
            </button>
            {/* Bộ lọc giá */}
            <div className="select-input">
                <span className="select-input__label">Giá</span>
                <i className="select-input__icon fa-solid fa-angle-down"></i>
                <ul className="select-input__list">
                    <li className="select-input__item">
                        <a href={getSortUrl('percent_asc')} className="select-input__link">
                            Phần trăm giảm: Thấp đến cao
                        </a>
                    </li>
                    <li className="select-input__item">
                        <a href={getSortUrl('percent_desc')} className="select-input__link">
                            Phần trăm giảm: Cao đến thấp
                        </a>
                    </li>
                    <li className="select-input__item">
                        <a href={getSortUrl('price_asc')} className="select-input__link">
                            Giá đã giảm: Thấp đến cao
                        </a>
                    </li>
                    <li className="select-input__item">
                        <a href={getSortUrl('price_desc')} className="select-input__link">
                            Giá đã giảm: Cao đến thấp
                        </a>
                    </li>
                </ul>
            </div>
            {/* Phân trang */}
            <div class="home-filter__page">
                <span class="home-filter__page-num">
                    <span class="home-filter__page-current">1</span>/14
                </span>

                <div class="home-filter__page-control">
                    <a href="" class="home-filter__page-btn home-filter__page-btn--disabled">
                        <i class="home-filter__page-icon fa-solid fa-angle-left"></i>
                    </a>
                    <a href="" class="home-filter__page-btn">
                        <i class="home-filter__page-icon fa-solid fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
