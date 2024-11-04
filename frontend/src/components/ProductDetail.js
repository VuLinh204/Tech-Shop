import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/ProductDetail.css";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost/tech-shop/backend/api/getProduct.php?id=${id}`
        );
        const data = await response.json();
        setProduct(data);

        // Nếu `product.color` có các thuộc tính chứa tên màu, thêm chúng vào mảng colors
        if (data.color && Array.isArray(data.color)) {
          setColors(data.color.map((c) => c.name || c.color || c)); // Giả sử tên màu ở thuộc tính `name`
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await axios.get(
          "http://localhost/tech-shop/backend/api/ColorApi.php"
        );

        // Nếu API trả về màu là tên đơn thuần, sử dụng nó; nếu không, lấy thuộc tính thích hợp.
        const colorData = Array.isArray(response.data)
          ? response.data.map((item) => item.name || item.color || item)
          : [];

        setColors(colorData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu màu sắc:", error);
        setColors([]);
      }
    };

    fetchProduct();
    fetchColors();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const newPrice =
    product.price - (product.price * product.percent_discount) / 100;

  return (
    <div className="app__container">
      <div className="grid">
        <div className="grid__row app__content">
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
                        ₫{product.price.toLocaleString()}
                      </span>
                      <span className="product-price-new">
                        ₫{newPrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="product-description">{product.description}</p>
                    <div className="product-actions">
                      <form className="product-actions-form">
                        {/* Hiển thị các màu sắc */}
                        <div className="color-options">
                          {colors.map((color, index) => (
                            <button
                              key={index}
                              type="button"
                              className={`color-btn ${
                                selectedColor === color ? "selected" : ""
                              }`}
                              onClick={() => setSelectedColor(color)}
                            >
                              {color} {/* Hiển thị tên màu */}
                            </button>
                          ))}
                        </div>
                        <button
                          type="submit"
                          className="btn product-add-to-cart"
                        >
                          Thêm Vào Giỏ Hàng
                        </button>
                      </form>
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
                          ({product.favorite_count}) Đã Thích
                        </div>
                      </div>
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
