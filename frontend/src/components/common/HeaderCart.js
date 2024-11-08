import React, { useState, useEffect } from "react";
import "../../assets/css/Cart.css";
import { getUser, logout } from "../../api/Api";

const Cart = () => {
  const [carts, setCarts] = useState([]); // State lưu giỏ hàng
  const [cartCount, setCartCount] = useState(0); // State lưu số lượng sản phẩm trong giỏ hàng
  const [user, setUser] = useState(null);

  // Hàm lấy thông tin người dùng
  const fetchUser = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      const data = await getUser();
      if (data.status === "success") {
        setUser(data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.error(data.message);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Chạy 1 lần khi component được mount

  // Hàm tính giá mới sau khi giảm giá
  const calculateNewPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  // Gọi API giỏ hàng khi user đã được tải
  useEffect(() => {
    if (user && user.id) {
      const userId = user.id;
      fetch(`http://localhost/tech-shop/backend/api/get_cart.php?userid=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.cartItems) {
            setCarts(data.cartItems); // Cập nhật giỏ hàng từ dữ liệu API
            setCartCount(data.cartItems.length); // Cập nhật số lượng giỏ hàng
          }
        })
        .catch((error) => console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error));
    }
  }, [user]); // Chạy lại khi user thay đổi

  return (
    <div className="header__cart">
      <a className="header__cart-click" href="/cart">
        <div className="header__cart-wrap">
          <i className="header__cart-icon fa-solid fa-cart-shopping"></i>
          <span className="header__cart-notice">{cartCount}</span>

          <div className="header__cart-list">
            {cartCount === 0 ? (
              <img
                src="assets/img/no-cart.webp"
                alt="Giỏ hàng trống"
                className="header__cart-no-cart-img"
              />
            ) : (
              <>
                <h4 className="header__cart-heading">Sản phẩm trong giỏ hàng</h4>
                <ul className="header__cart-list-item">
                  {carts.map((cart) => {
                    const newPrice = calculateNewPrice(
                      cart.price,
                      cart.discount_percent
                    );
                    return (
                      <li key={cart.id} className="header__cart-item">
                        <a href={`/detail/${cart.id}`}>
                          <img
                            src={`http://localhost/tech-shop/backend/public/uploads/${cart.thumbnail}`} // Đảm bảo đường dẫn ảnh đúng
                            alt={cart.name}
                            className="header__cart-img"
                          />
                        </a>
                        <div className="header__cart-item-info">
                          <div className="header__cart-item-head">
                            <h5 className="header__cart-item-name">
                              <a href={`/detail/${cart.id}`}>
                                {cart.name}
                              </a>
                            </h5>
                            <div className="header__cart-item-price-wrap">
                              <span className="header__cart-item-price">
                                {newPrice.toLocaleString()}đ
                              </span>
                              <span className="header__cart-item-multiply">x</span>
                              <span className="header__cart-item-qnt">
                                {cart.quantity}
                              </span>
                            </div>
                          </div>
                          <div className="header__cart-item-body">
                            <span className="header__cart-item-description">
                              Phân loại: {cart.category}
                            </span>
                            <form action={`/cart/remove/${cart.id}`} method="post">
                              <button
                                type="submit"
                                className="header__cart-item-remove"
                              >
                                Xóa
                              </button>
                            </form>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  <a href="/cart" className="header__cart-view-cart btn btn--primary">
                    Xem giỏ hàng
                  </a>
                </ul>
              </>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default Cart;
