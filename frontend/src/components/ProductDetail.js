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
