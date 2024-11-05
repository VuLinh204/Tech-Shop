// ProductCard.js
import React from 'react';
import '../../assets/css/HomeProduct.css';

const ProductCard = ({ product }) => {
    const imageUrl = product.image;
    const newPrice = product.price - (product.price * product.percent_discount) / 100;

    return (
        <div className="grid__column-2-4">
            <a className="home__product-item" href={`/ProductDetail/${product.id}`}>
                <div
                    className="home__product-item__img"
                    style={{ backgroundImage: `url(${require(`../../assets/img/${imageUrl}`)})` }}
                ></div>
                <h4 className="home__product-item__name">{product.name}</h4>
                <div className="home__product-item__price">
                    <span className="home__product-item__price-old">{product.price.toLocaleString()}</span>
                    <span className="home__product-item__price-current">{newPrice.toLocaleString()}</span>
                </div>
                <div className="home__product-item__action">
                    {product.is_favorited && (
                        <span className="home__product-item__like home__product-item__like--liked">
                            <i className="home__product-item__like-icon-empty fa-regular fa-heart"></i>
                            <i className="home__product-item__like-icon-fill fa-solid fa-heart"></i>
                        </span>
                    )}
                    <div className="home__product-item__rating">
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className="home__product-item__star--gold fa-solid fa-star"></i>
                        ))}
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <span className="home__product-item__sold">{product.quantity_sold} Đã bán</span>
                </div>
                <div className="home__product-item__origin">
                    <span className="home__product-item__brand">GenZ</span>
                    <span className="home__product-item__origin-name">Việt Nam</span>
                </div>
                {product.percent_discount > 0 && (
                    <div className="home__product-item__sale-off">
                        <span className="home__product-item__sale-off-percent">{product.percent_discount}%</span>
                        <span className="home__product-item__sale-off-label">GIẢM</span>
                    </div>
                )}
            </a>
        </div>
    );
};

export default ProductCard;
