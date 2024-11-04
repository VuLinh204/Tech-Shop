import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/ProductDetail.css";

const ProductDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm
  const [selectedSize, setSelectedSize] = useState(""); // Kích thước đã chọn
  const [selectedColor, setSelectedColor] = useState(""); // Màu sắc đã chọn
  const products = {
    id: 1,
    name: "Sản phẩm mẫu",
    price: 1000000,
    percent_discount: 10,
    description: "Đây là mô tả của sản phẩm mẫu.",
    image: "product_image.png",
    size: ["S", "M", "L"],
    color: ["Red", "Blue", "Green"],
    favorite_count: 25,
    comments: [
      {
        id: 1,
        user: { name: "Người dùng 1" },
        body: "Bình luận mẫu 1",
        created_at: "2 giờ trước",
        image: "user1.png",
      },
      {
        id: 2,
        user: { name: "Người dùng 2" },
        body: "Bình luận mẫu 2",
        created_at: "1 ngày trước",
        image: "user2.png",
      },
    ],
  };

  // Xử lý chọn size
  const handleSelectSize = (size) => {
    setSelectedSize(size);
  };

  // Xử lý chọn màu sắc
  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:82/tech-shop/backend/api/getProduct.php?id=${id}`
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
  const newPrice =
    product.price - (product.price * product.percent_discount) / 100;

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
                    <img
                      src={`./src/assets/img/${product.image}`}
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

                        <div className="size-options">
                          {products.size.map((size) => (
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
                        <input
                          type="hidden"
                          name="selected_size"
                          value={selectedSize}
                        />

                        <div className="color-options">
                          {products.color.map((color) => (
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
                        <input
                          type="hidden"
                          name="selected_color"
                          value={selectedColor}
                        />

                        <button
                          type="submit"
                          className="btn product-add-to-cart"
                        >
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
                        <div className="favorite__qty">
                          ({products.favorite_count}) Đã Thích
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Các phần khác giữ nguyên... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
