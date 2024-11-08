import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/ProductDisplay.css';

const ProductDisplay = ({ products }) => {
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        // Chuyển hướng đến trang chi tiết sản phẩm với ID sản phẩm
        navigate(`/productDetail/${productId}`);
    };

    return (
        <div className="product-display">
            {products.length > 0 ? (
                products.map((product) => (
                    <div
                        key={product.id}
                        className="product-item product-display-column"
                        onClick={() => handleProductClick(product.id)} // Thêm sự kiện click
                    >
                        <div
                            className="product-image"
                            style={{
                                backgroundImage: `url(http://localhost/tech-shop/backend/public/uploads/${product.thumbnail})`,
                                width: '100%',
                                height: '320px',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                marginBottom: '10px',
                            }}
                        ></div>
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">Giá: {product.price} VNĐ</p>
                    </div>
                ))
            ) : (
                <p>Không có sản phẩm nào trong danh mục này.</p>
            )}
        </div>
    );
};

export default ProductDisplay;
