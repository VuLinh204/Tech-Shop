import React from "react";
import "../assets/css/ProductDisplay.css";

const ProductDisplay = ({ products }) => {
  return (
    <div className="product-display">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-item product-display-column">
            <div
              className="product-image"
              style={{
                backgroundImage: `url(${product.thumbnail})`,
                width: "60px",
                height: "60px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                marginBottom: "10px",
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
