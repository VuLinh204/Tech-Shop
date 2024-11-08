import React, { useEffect, useState } from "react";
import axios from "axios";
import EmtyCart from '../../assets/img/emty-cart.png';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Lấy giỏ hàng từ API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost/tech-shop/backend/api/get_cart.php?userid=1'); // API path của bạn
        const data = await response.json();
        
        // Kiểm tra nếu API trả về dữ liệu giỏ hàng hợp lệ
        if (data && data.cartItems) {
          setCartItems(data.cartItems); // Cập nhật giỏ hàng từ API
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm giỏ hàng:", error);
      }
    };
  
    fetchCartItems();
  }, []);

  useEffect(() => {
    updateTotal();
  }, [cartItems]);

  const updateTotal = () => {
    let quantity = 0;
    let price = 0;
  
    cartItems.forEach((cart) => {
      const newPrice =
        cart.price - (cart.price * cart.percent_discount) / 100;
      quantity += cart.quantity;
      price += cart.quantity * newPrice;
    });
  
    setTotalQuantity(quantity);
    setTotalPrice(price);
  };

  const handleQuantityChange = (id, change) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cart) =>
        cart.id === id
          ? { ...cart, quantity: Math.max(1, cart.quantity + change) }
          : cart
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cart) => cart.id !== id)
    );
  };

  // Fetch related products (could be based on user data or product categories)
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch('http://localhost/tech-shop/backend/api/get_related_products.php');
        const data = await response.json();
        if (data && data.products) {
          setRelatedProducts(data.products); // Set related products
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm liên quan:", error);
      }
    };
  
    fetchRelatedProducts();
  }, []);

  return (
    <div className="app__container">
      <div className="grid">
        <div className="grid__row app__content">
          <div className="grid__column">
            <section className="shopping-cart">
              <h2>Giỏ Hàng</h2>
              <div className="cart-actions">
                {cartItems.length === 0 ? (
                  <div className="cart-emty">
                    <img src={EmtyCart} alt="No-cart" />
                    <a href="/product" className="button buy-now-btn">
                      Mua Ngay
                    </a>
                  </div>
                ) : (
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Hình Ảnh</th>
                        <th>Tên</th>
                        <th>Mã Sản Phẩm</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Đơn Giá (VND)</th>
                        <th>Số Lượng</th>
                        <th>Số Tiền (VND)</th>
                        <th>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((cart) => {
                        const newPrice =
                          cart.price - (cart.price * cart.discount_percent) / 100;
                        return (
                          <tr key={cart.id} className="cart-item">
                            <td>
                              <img
                                src={`http://localhost/tech-shop/backend/public/uploads/${cart.thumbnail}`} // Đảm bảo đường dẫn ảnh đúng
                                alt="Product thumbnail"
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td>{cart.name}</td>
                            <td>{cart.id}</td>
                            <td>{cart.size}</td>
                            <td>{cart.color}</td>
                            <td>{newPrice.toLocaleString()}</td>
                            <td>
                              <button
                                onClick={() => handleQuantityChange(cart.id, -1)}
                                className="quantity-btn"
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <span className="quantity">{cart.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(cart.id, 1)}
                                className="quantity-btn"
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </td>
                            <td>
                              {(cart.quantity * newPrice).toLocaleString()}
                            </td>
                            <td>
                              <button
                                onClick={() => handleRemoveItem(cart.id)}
                                className="remove-item"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td colSpan="6">Tổng Số Lượng Sản Phẩm:</td>
                        <td>{totalQuantity}</td>
                        <td colSpan="2">
                          <strong>{totalPrice.toLocaleString()}</strong>
                        </td>
                        <td>
                          <button className="button checkout-btn">Thanh Toán</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </section>

            {/* Section related products */}
            <section className="related-products">
              <div className="container">
                <h2>Có thể bạn sẽ thích</h2>
                <div className="grid__row">
                  {relatedProducts.map((product) => {
                    const newPrice =
                      product.price - (product.price * product.percent_discount) / 100;
                    return (
                      <div key={product.id} className="grid__column-2-4">
                        <a
                          href={`/productDetail/${product.id}`}
                          className="home-product-item"
                        >
                          <div
                            className="home-product-item__img"
                            style={{
                              backgroundthumbnail: `url('/assets/img/${product.thumbnail}')`,
                            }}
                          ></div>
                          <h4 className="home-product-item__name">
                            {product.name}
                          </h4>
                          <div className="home-product-item__price">
                            <span className="home-product-item__price-old">
                              {product.price.toLocaleString()}
                            </span>
                            <span className="home-product-item__price-current">
                              {newPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="home-product-item__action">
                            <span className="home-product-item__sold">
                              {product.quantity_sold} Đã bán
                            </span>
                          </div>
                          {product.percent_discount > 0 && (
                            <div className="home-product-item__sale-off">
                              <span className="home-product-item__sale-off-percent">
                                {product.percent_discount}%
                              </span>
                              <span className="home-product-item__sale-off-label">
                                GIẢM
                              </span>
                            </div>
                          )}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
