import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../assets/css/ProductDetail.css";

const ProductDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm
  const [selectedSize, setSelectedSize] = useState(""); // Kích thước đã chọn
  const [selectedColor, setSelectedColor] = useState(""); // Màu sắc đã chọn

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost/tech-shop/backend/api/getProduct.php?id=${id}`
        ); // Cập nhật đường dẫn API
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (!product) {
    return <div>Loading...</div>; // Hiển thị loading khi dữ liệu đang được lấy
  }

  // Tính toán giá mới
  const newPrice = product.price - (product.price * product.percent_discount) / 100;

  return (
    <div className="app__container">
      <div className="grid">
        <div className="grid__row app__content">
          <div className="grid__column-2">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link> &gt;
              <Link to="/products" className="breadcrumb-link">Product</Link> &gt;
              <span className="breadcrumb-current">{product.name}</span>
            </div>
          </div>
          <div className="grid__column-10">
            <section className="product-section">
              <div className="product-container">
                <div className="product-row">
                  <div className="product-image">
                    <img
                      src={`http://localhost/tech-shop/backend/public/uploads/${product.thumbnail}`}
                      alt="Product"
                    />
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
                        <br />
                        <button
                          type="submit"
                          className="btn product-add-to-cart"
                        >
                          Thêm Vào Giỏ Hàng
                        </button>
                      </form>
                      <hr />

                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
