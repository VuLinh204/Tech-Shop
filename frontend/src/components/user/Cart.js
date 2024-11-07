import React, { useEffect, useState } from "react";
import axios from "axios";
import EmtyCart from '../../assets/img/emty-cart.png';

const Cart = () => {
  // Sample data for cart items
  const sampleCarts = [
    {
      id: 1,
      product: {
        id: 1,
        name: "Áo Thun GenZ",
        image: "product1.jpg",
        price: 250000,
        percent_discount: 10,
      },
      quantity: 2,
      size: "M",
      color: "Red",
    },
    {
      id: 2,
      product: {
        id: 2,
        name: "Quần Jean Nam",
        image: "product2.jpg",
        price: 500000,
        percent_discount: 20,
      },
      quantity: 1,
      size: "L",
      color: "Blue",
    },
  ];

  // Sample data for related products
  const sampleRelatedProducts = [
    {
      id: 1,
      name: "Giày Thể Thao",
      image: "related1.jpg",
      price: 800000,
      percent_discount: 15,
      quantity_sold: 200,
    },
    {
      id: 2,
      name: "Balo GenZ",
      image: "related2.jpg",
      price: 300000,
      percent_discount: 5,
      quantity_sold: 150,
    },
  ];

  // Sample data for favorite products
  const sampleFavoriteProducts = [
    {
      product_id: 201,
      is_favorite: true,
    },
    {
      product_id: 202,
      is_favorite: false,
    },
  ];

  const [cartItems, setCartItems] = useState(sampleCarts);
  const [relatedProducts, setRelatedProducts] = useState(sampleRelatedProducts);
  const [favoriteProducts, setFavoriteProducts] = useState(
    sampleFavoriteProducts
  );
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    updateTotal();
  }, [cartItems]);

  const updateTotal = () => {
    let quantity = 0;
    let price = 0;

    cartItems.forEach((cart) => {
      const newPrice =
        cart.product.price -
        (cart.product.price * cart.product.percent_discount) / 100;
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
                          cart.product.price -
                          (cart.product.price * cart.product.percent_discount) /
                            100;
                        return (
                          <tr key={cart.id} className="cart-item">
                            <td>
                              <img
                                src="#"
                                alt="Product Image"
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td>{cart.product.name}</td>
                            <td>{cart.product.id}</td>
                            <td>{cart.size}</td>
                            <td>{cart.color}</td>
                            <td>{newPrice.toLocaleString()}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handleQuantityChange(cart.id, -1)
                                }
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
                        <td colSpan="2">Tổng Số Lượng Sản Phẩm:</td>
                        <td colSpan="2">{totalQuantity}</td>
                        <td colSpan="2">Tổng Số Tiền:</td>
                        <td colSpan="2">
                          <strong>{totalPrice.toLocaleString()}</strong>
                        </td>
                        <td>
                          <button className="button checkout-btn">
                            Thanh Toán
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </section>
            <div div />

            <section className="related-products">
              <div className="container">
                <h2>Có thể bạn sẽ thích</h2>
                <div className="grid__row">
                  {relatedProducts.map((product) => {
                    const newPrice =
                      product.price -
                      (product.price * product.percent_discount) / 100;
                    const isFavorited = favoriteProducts.some(
                      (fav) => fav.product_id === product.id && fav.is_favorite
                    );

                    return (
                      <div key={product.id} className="grid__column-2-4">
                        <a
                          href={`/productDetail/${product.id}`}
                          className="home-product-item"
                        >
                          <div
                            className="home-product-item__img"
                            style={{
                              backgroundImage: `url('/assets/img/${product.image}')`,
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
                            {isFavorited && (
                              <span className="home-product-item__like home-product-item__like--liked">
                                <i className="fa-regular fa-heart"></i>
                                <i className="fa-solid fa-heart"></i>
                              </span>
                            )}
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
