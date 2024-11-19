import React, { useEffect, useState } from "react";
import EmtyCart from "../../assets/img/emty-cart.png";
import { getUser } from "../../api/Api";
import { useNavigate } from "react-router-dom"; // Thêm import

const Cart = () => {
  const navigate = useNavigate(); // Sử dụng hook điều hướng
  const [cartItems, setCartItems] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  // Lấy thông tin người dùng từ API
  const fetchUser = async () => {
    if (!user) {
      const data = await getUser();
      if (data.status === "success") {
        setUser(data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.error(data.message);
      }
    }
  };
  const handleCheckout = () => {
    navigate("/payment", { state: { cartItems } }); // Điều hướng đến Payment và truyền giỏ hàng
  };
  // Lấy thông tin giỏ hàng từ API
  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost/tech-shop/backend/api/get_cart.php?userid=${userId}`
      );
      const data = await response.json();

      if (data.status === "success" && data.cartItems) {
        setCartItems(data.cartItems); // Cập nhật giỏ hàng
        updateTotal(data.cartItems); // Tính tổng số lượng và tổng giá trị
      } else {
        console.log("Giỏ hàng trống hoặc không có dữ liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  // Fetch user và giỏ hàng khi component mount
  useEffect(() => {
    fetchUser();
  }, []); // Chạy một lần khi component mount

  // Khi user thay đổi, fetch giỏ hàng
  useEffect(() => {
    if (user) {
      fetchCartItems(user.id);
    }
  }, [user]); // Chạy lại khi user thay đổi

  // Tính toán tổng số lượng và tổng giá trị
  const updateTotal = (items) => {
    let quantity = 0;
    let price = 0;

    items.forEach((cart) => {
      const newPrice = cart.price - (cart.price * cart.discount_percent) / 100; // Tính giá sau giảm giá
      quantity += cart.quantity;
      price += cart.quantity * newPrice; // Tổng giá trị
    });

    setTotalQuantity(quantity);
    setTotalPrice(price);
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const handleQuantityChange = (id, color, change) => {
    const updatedCartItems = [...cartItems];
    let found = false;

    // Tìm xem sản phẩm có trong giỏ hàng chưa
    updatedCartItems.forEach((cart, index) => {
      if (cart.product_id === id && cart.color === color) {
        updatedCartItems[index].quantity = Math.max(1, cart.quantity + change);
        found = true;
      }
    });

    // Nếu sản phẩm chưa có, thêm vào giỏ hàng
    if (!found) {
      updatedCartItems.push({ product_id: id, color, quantity: 1 });
    }

    setCartItems(updatedCartItems);
    updateTotal(updatedCartItems);
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id, color) => {
    const updatedCartItems = cartItems.filter(
      (cart) => cart.product_id !== id || cart.color !== color
    );

    setCartItems(updatedCartItems);
    updateTotal(updatedCartItems);
  };

  // Fetch sản phẩm liên quan
  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost/tech-shop/backend/api/get_related_products.php"
      );
      const data = await response.json();
      if (data && data.products) {
        setRelatedProducts(data.products);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm liên quan:", error);
    }
  };

  // Fetch sản phẩm liên quan khi component mount
  useEffect(() => {
    fetchRelatedProducts();
  }, []); // Chạy một lần khi component mount

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
                          cart.price -
                          (cart.price * cart.discount_percent) / 100;
                        return (
                          <tr
                            key={cart.product_id + cart.color}
                            className="cart-item"
                          >
                            <td>
                              <img
                                src={`http://localhost/tech-shop/backend/public/uploads/${cart.thumbnail}`}
                                alt="Product thumbnail"
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td>{cart.product_name}</td>
                            <td>{cart.product_id}</td>
                            <td>{cart.color || "Không có màu"}</td>
                            <td>{newPrice.toLocaleString()}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    cart.product_id,
                                    cart.color,
                                    -1
                                  )
                                }
                                className="quantity-btn"
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <span className="quantity">{cart.quantity}</span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    cart.product_id,
                                    cart.color,
                                    1
                                  )
                                }
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
                                onClick={() =>
                                  handleRemoveItem(cart.product_id, cart.color)
                                }
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
                          <button className="button checkout-btn" onClick={handleCheckout}>
                            Thanh Toán
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </section>

            <section className="related-products">
              <div className="container">
                <h2>Có thể bạn sẽ thích</h2>
                <div className="grid__row">
                  {relatedProducts.map((product) => {
                    const newPrice =
                      product.price -
                      (product.price * product.percent_discount) / 100;
                    return (
                      <div key={product.id} className="grid__column-2-4">
                        <a
                          href={`/productDetail/${product.id}`}
                          className="home-product-item"
                        >
                          <div
                            className="home-product-item__img"
                            style={{
                              backgroundImage: `url('/assets/img/${product.thumbnail}')`,
                            }}
                          ></div>
                          <h4 className="home-product-item__name">
                            {product.product_name}
                          </h4>
                          <div className="home-product-item__price">
                            <span>{newPrice.toLocaleString()}</span>
                          </div>
                          {product.percent_discount > 0 && (
                            <div className="home-product-item__discount">
                              <span>{product.percent_discount}%</span>
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
