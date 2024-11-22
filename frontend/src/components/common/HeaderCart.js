import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteToCart, getProductsCart, getUser } from '../../api/Api';
import noCart from '../../assets/img/no-cart.webp';
import '../../assets/css/Cart.css';

const HeaderCart = () => {
    const [carts, setCarts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem('user')));
    const navigate = useNavigate();

    const fetchUser = useCallback(async () => {
        if (!user) {
            const data = await getUser();
            if (data.status === 'success') {
                setUser(data.user);
                sessionStorage.setItem('user', JSON.stringify(data.user));
            }
        }
    }, [user]);

    const fetchCart = useCallback(async () => {
        if (user && user.id) {
            const response = await getProductsCart(user.id);
            if (response?.cart_items) {
                setCarts(response.cart_items);
                setCartCount(response.cart_items.length);
            } else {
                setCarts([]);
                setCartCount(0);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        fetchCart();
    }, [user, fetchCart]);

    const handleRemove = async (cartId) => {
        const response = await deleteToCart(cartId);
        if (response.status === 'success') fetchCart();
    };

    const handleRouteCart = () => {
        navigate(`/cart`);
    };

    const calculateNewPrice = (price, discount) => price - (price * discount) / 100;

    return (
        <div className="header__cart">
            <div onClick={handleRouteCart} className="header__cart-click">
                <div className="header__cart-wrap">
                    <i className="header__cart-icon fa-solid fa-cart-shopping"></i>
                    <span className="header__cart-notice">{cartCount}</span>

                    <div className="header__cart-list">
                        {cartCount === 0 ? (
                            <img src={noCart} alt="Giỏ hàng trống" className="header__cart-no-cart-img" />
                        ) : (
                            <>
                                <h4 className="header__cart-heading">Sản phẩm trong giỏ hàng</h4>
                                <ul className="header__cart-list-item">
                                    {carts.map((cart, index) => {
                                        const newPrice = calculateNewPrice(cart.price, cart.discount_percent);
                                        return (
                                            <li key={`${cart.id}-${index}`} className="header__cart-item">
                                                <img
                                                    src={`http://localhost/tech-shop/backend/public/uploads/${cart.thumbnail}`} // Đảm bảo đường dẫn ảnh đúng
                                                    alt={cart.name}
                                                    className="header__cart-img"
                                                />
                                                <div className="header__cart-item-info">
                                                    <div className="header__cart-item-head">
                                                        <h5 className="header__cart-item-name">{cart.product_name}</h5>
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
                                                            Phân loại: {cart.category_name}
                                                        </span>
                                                        <button
                                                            className="header__cart-item-remove"
                                                            onClick={(event) => handleRemove(cart.cart_item_id, event)}
                                                        >
                                                            Xóa
                                                        </button>
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
            </div>
        </div>
    );
};

export default HeaderCart;
