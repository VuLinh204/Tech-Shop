import React, { useEffect, useState } from 'react';
import EmtyCart from '../../assets/img/emty-cart.png';
import { deleteToCart, getProductsCart, getUser, updateToCart } from '../../api/Api';
import RelatedProducts from './RelatedProducts';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    // const [cart, setCart] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);

    // Lấy thông tin người dùng từ API
    const fetchUser = async () => {
        if (!user) {
            const data = await getUser();
            if (data.status === 'success') {
                setUser(data.user);
                sessionStorage.setItem('user', JSON.stringify(data.user));
            } else {
                console.error(data.message);
            }
        }
    };

    // Lấy thông tin giỏ hàng từ API
    const fetchCartItems = async (userId) => {
        try {
            const response = await getProductsCart(userId);

            if (response.cart_items && Array.isArray(response.cart_items)) {
                setCartItems(response.cart_items);
                updateTotal(response.cart_items);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
        }
    };

    // Fetch user và giỏ hàng khi component mount
    useEffect(() => {
        fetchUser();
    }, []);

    // Khi user thay đổi, fetch giỏ hàng
    useEffect(() => {
        if (user) {
            fetchCartItems(user.id);
        }
    }, [user]);

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
    const handleQuantityChange = async (id, color, change) => {
        const updatedCartItems = cartItems.map((cart) =>
            cart.product_id === id && cart.cart_item_color === color
                ? { ...cart, quantity: cart.quantity + change }
                : cart,
        );

        setCartItems(updatedCartItems);
        updateTotal(updatedCartItems);

        const userId = user.id;
        const productId = id;
        const colorProduct = color;
        const quantity = updatedCartItems.find(
            (item) => item.product_id === id && item.cart_item_color === color,
        )?.quantity;

        try {
            const response = await updateToCart(userId, productId, quantity, colorProduct);
            if (response.status === 'success') {
                setCartItems(updatedCartItems);
            } else {
                console.error('Cập nhật giỏ hàng thất bại:', response.message);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật giỏ hàng:', error);
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const handleRemoveItem = async (id) => {
        try {
            // Gửi yêu cầu xóa sản phẩm khỏi giỏ hàng trên server
            const response = await deleteToCart(id);

            if (response.status === 'success') {
                const updatedCartItems = cartItems.filter((cart) => cart.cart_item_id !== id);
                setCartItems(updatedCartItems);
                updateTotal(updatedCartItems);
            } else {
                console.error('Không thể xóa sản phẩm khỏi giỏ hàng:', response.message);
            }
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    };

    // Fetch sản phẩm liên quan
    const fetchRelatedProducts = async () => {
        try {
            const response = await fetch('http://localhost/tech-shop/backend/api/relatedProducts.php');
            const data = await response.json();
            if (data && data.products) {
                setRelatedProducts(data.products);
            }
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm liên quan:', error);
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
                                        <a href="/home" className="button buy-now-btn">
                                            Mua Ngay
                                        </a>
                                    </div>
                                ) : (
                                    <table className="cart-table">
                                        <thead>
                                            <tr>
                                                <th>Hình Ảnh</th>
                                                <th colSpan={3}>Tên</th>
                                                <th>Mã Sản Phẩm</th>
                                                <th>Color</th>
                                                <th>Đơn Giá (VND)</th>
                                                <th>Số Lượng</th>
                                                <th colSpan={2}>Số Tiền (VND)</th>
                                                <th>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((cart) => {
                                                const newPrice =
                                                    cart.price - (cart.price * cart.discount_percent) / 100;
                                                return (
                                                    <tr
                                                        key={cart.product_id + cart.cart_item_color}
                                                        className="cart-item"
                                                    >
                                                        <td>
                                                            <img
                                                                src={`http://localhost/tech-shop/backend/public/uploads/${cart.thumbnail}`}
                                                                alt="Product thumbnail"
                                                                style={{ width: '100px' }}
                                                            />
                                                        </td>
                                                        <td colSpan={3}>{cart.product_name}</td>
                                                        <td>{cart.product_id}</td>
                                                        <td>{cart.cart_item_color || 'Không có màu'}</td>
                                                        <td>{newPrice.toLocaleString()}</td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        cart.product_id,
                                                                        cart.cart_item_color,
                                                                        -1,
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
                                                                        cart.cart_item_color,
                                                                        1,
                                                                    )
                                                                }
                                                                className="quantity-btn"
                                                            >
                                                                <i className="fas fa-plus"></i>
                                                            </button>
                                                        </td>
                                                        <td colSpan={2}>
                                                            {(cart.quantity * newPrice).toLocaleString()}
                                                        </td>
                                                        <td>
                                                            <button
                                                                id={cart.cart_item_id}
                                                                onClick={() => handleRemoveItem(cart.cart_item_id)}
                                                                className="remove-item"
                                                            >
                                                                <i className="fas fa-trash-alt"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            <tr>
                                                <td colSpan="7">Tổng Số Lượng Sản Phẩm:</td>
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

                        <RelatedProducts />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
