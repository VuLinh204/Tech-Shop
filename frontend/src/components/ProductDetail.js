import React, { useState } from 'react';
import '../assets/css/ProductDetail.css';

const ProductDetails = () => {
    // Dữ liệu mẫu cho sản phẩm
    const product = {
        id: 1,
        name: 'Sản phẩm mẫu',
        price: 1000000,
        percent_discount: 10,
        description: 'Đây là mô tả của sản phẩm mẫu.',
        image: 'product_image.png',
        size: ['S', 'M', 'L'],
        color: ['Red', 'Blue', 'Green'],
        favorite_count: 25,
        comments: [
            {
                id: 1,
                user: { name: 'Người dùng 1' },
                body: 'Bình luận mẫu 1',
                created_at: '2 giờ trước',
                image: 'user1.png',
            },
            {
                id: 2,
                user: { name: 'Người dùng 2' },
                body: 'Bình luận mẫu 2',
                created_at: '1 ngày trước',
                image: 'user2.png',
            },
        ],
    };

    // Dữ liệu mẫu cho sản phẩm liên quan
    const relatedProducts = [
        {
            id: 1,
            name: 'Sản phẩm liên quan 1',
            price: 500000,
            percent_discount: 5,
            image: 'related1.png',
            quantity_sold: 50,
        },
        {
            id: 2,
            name: 'Sản phẩm liên quan 2',
            price: 750000,
            percent_discount: 15,
            image: 'related2.png',
            quantity_sold: 30,
        },
    ];

    // Dữ liệu mẫu cho sản phẩm yêu thích
    const favoriteProducts = [
        { product_id: 1, is_favorite: true },
        { product_id: 2, is_favorite: false },
    ];

    // Tính toán giá mới
    const newPrice = product.price - (product.price * product.percent_discount) / 100;

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    // Xử lý tăng giảm số lượng
    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    // Xử lý chọn size
    const handleSelectSize = (size) => {
        setSelectedSize(size);
    };

    // Xử lý chọn màu sắc
    const handleSelectColor = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row app__content">
                    <div className="grid__column-2">
                        <nav className="manager">
                            <h3 className="manager__heading">Product</h3>
                        </nav>
                    </div>
                    <div className="grid__column-10">
                        <section className="product-section">
                            <div className="product-container">
                                <div className="product-row">
                                    <div className="product-image">
                                        <img src={`./src/assets/img/${product.image}`} alt="Product" />
                                    </div>
                                    <div className="product-details">
                                        <h1 className="product-title">{product.name}</h1>
                                        <div className="product-prices">
                                            <span className="product-price-old">
                                                <h6>₫</h6>
                                                {product.price.toLocaleString()}
                                            </span>
                                            <span className="product-price-new">
                                                <h3>₫{newPrice.toLocaleString()}</h3>
                                            </span>
                                        </div>
                                        <p className="product-description">{product.description}</p>
                                        <div className="product-actions">
                                            <form className="product-actions-form">
                                                <div className="quantity-input">
                                                    <button
                                                        type="button"
                                                        className="quantity-decrement"
                                                        onClick={decrementQuantity}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        className="product-quantity"
                                                        type="text"
                                                        value={quantity}
                                                        readOnly
                                                    />
                                                    <button
                                                        type="button"
                                                        className="quantity-increment"
                                                        onClick={incrementQuantity}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="size-options">
                                                    {product.size.map((size) => (
                                                        <button
                                                            key={size}
                                                            type="button"
                                                            className="size-btn"
                                                            onClick={() => setSelectedSize(size)}
                                                        >
                                                            {size}
                                                        </button>
                                                    ))}
                                                </div>
                                                <input type="hidden" name="selected_size" value={selectedSize} />

                                                <div className="color-options">
                                                    {product.color.map((color) => (
                                                        <button
                                                            key={color}
                                                            type="button"
                                                            className="color-btn"
                                                            onClick={() => setSelectedColor(color)}
                                                        >
                                                            {color}
                                                        </button>
                                                    ))}
                                                </div>
                                                <input type="hidden" name="selected_color" value={selectedColor} />

                                                <button type="submit" className="btn product-add-to-cart">
                                                    Thêm Vào Giỏ Hàng
                                                </button>
                                            </form>
                                            <hr />
                                            <div className="favorite">
                                                <button type="button" className="favorite__btn">
                                                    <svg width="25" height="20">
                                                        <path
                                                            d="M19.469 1.262c-5.284-1.53-7.47 4.142-7.47 4.142S9.815-.269 4.532 1.262C-1.937 3.138.44 13.832 12 19.333c11.559-5.501 13.938-16.195 7.469-18.07z"
                                                            fill="#FF424F"
                                                        />
                                                    </svg>
                                                </button>
                                                <div className="favorite__qty">({product.favorite_count}) Đã Thích</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <br />
                        <section className="related-products">
                            <div className="container">
                                <h2 className="related-products__title">Sản phẩm liên quan</h2>
                                <div className="related-products-slider">
                                    {relatedProducts.map((row) => {
                                        const isFavorited = favoriteProducts.some(
                                            (fav) => fav.product_id === row.id && fav.is_favorite,
                                        );
                                        const relatedNewPrice = row.price - (row.price * row.percent_discount) / 100;
                                        return (
                                            <div key={row.id} className="grid__column-2-4">
                                                <a className="home__product-item" href={`#`}>
                                                    <div
                                                        className="home__product-item__img"
                                                        style={{
                                                            backgroundImage: `url(./src/assets/img/${row.image})`,
                                                        }}
                                                    ></div>
                                                    <h4 className="home__product-item__name">{row.name}</h4>
                                                    <div className="home__product-item__price">
                                                        <span className="home__product-item__price-old">
                                                            {row.price.toLocaleString()}
                                                        </span>
                                                        <span className="home__product-item__price-current">
                                                            {relatedNewPrice.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="home__product-item__action">
                                                        {isFavorited && (
                                                            <span className="home__product-item__like home__product-item__like--liked">
                                                                <i className="home__product-item__like-icon-empty fa-regular fa-heart"></i>
                                                                <i className="home__product-item__like-icon-fill fa-solid fa-heart"></i>
                                                            </span>
                                                        )}
                                                        <div className="home__product-item__rating">
                                                            <i className="home__product-item__star--gold fa-solid fa-star"></i>
                                                            <i className="home__product-item__star--gold fa-solid fa-star"></i>
                                                            <i className="home__product-item__star--gold fa-solid fa-star"></i>
                                                            <i className="home__product-item__star--gold fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                        </div>
                                                        <span className="home__product-item__sold">
                                                            {row.quantity_sold} Đã bán
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                        <br />
                        <div className="container mt-5">
                            <div className="d-flex justify-content-center row">
                                <div className="col-md-8">
                                    <div className="d-flex flex-column comment-section">
                                        <div className="bg-light p-2 mb-2">
                                            <form id="commentForm">
                                                <div className="d-flex flex-row align-items-start">
                                                    <textarea
                                                        className="form-control ml-1 shadow-none textarea"
                                                        placeholder="Viết bình luận của bạn..."
                                                    ></textarea>
                                                </div>
                                                <div className="mt-2 text-right">
                                                    <button
                                                        className="btn btn-primary btn-sm shadow-none"
                                                        type="submit"
                                                    >
                                                        Bình luận
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-primary btn-sm ml-1 shadow-none"
                                                        type="button"
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        {product.comments.map((comment) => (
                                            <div key={comment.id} className="comment bg-white p-2">
                                                <div className="d-flex flex-row user-info">
                                                    <img
                                                        className="rounded-circle"
                                                        src={`./src/assets/img/${comment.user.image}`}
                                                        width="40"
                                                        alt="User"
                                                    />
                                                    <div className="d-flex flex-column justify-content-start">
                                                        <span className="d-block font-weight-bold name">
                                                            {comment.user.name}
                                                        </span>
                                                        <span className="date text-black-50">
                                                            {comment.created_at.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <span className="text-justify comment-text">{comment.body}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
