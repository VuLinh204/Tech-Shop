import React, { useState, useEffect } from 'react';
import '../../assets/css/payment.css';
import axios from 'axios';
import { getProductsCart, getUser, checkoutOrder, updateUser, updateToCart, clearCart } from '../../api/Api';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        fullName: '',
        phone: '',
        address: '',
        message: '',
    });
    const [discountCode, setDiscountCode] = useState('');
    const [deliveryOption, setDeliveryOption] = useState('J&T');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const navigate = useNavigate();

    // Dữ liệu thông tin khách hàng lấy từ sessionStorage khi component được render
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setCustomerInfo({
                user_id: storedUser.id,
                email: storedUser.email || '',
                fullName: storedUser.username || '',
                phone: storedUser.phone_number || '',
                address: storedUser.address || '',
                message: '',
            });
        }
    }, []);

    const handleUpdateInfo = async () => {
        try {
            const userId = JSON.parse(sessionStorage.getItem('user'))?.id;
            const response = await axios.post(
                'http://localhost/tech-shop/backend/api/update_profile.php',
                {
                    user_id: userId,
                    username: customerInfo.fullName,
                    phone_number: customerInfo.phone,
                    address: customerInfo.address,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            if (response.data.success) {
                alert('Cập nhật thông tin thành công!');
                sessionStorage.setItem(
                    'user',
                    JSON.stringify({
                        ...JSON.parse(sessionStorage.getItem('user')),
                        username: customerInfo.fullName,
                        phone_number: customerInfo.phone,
                        address: customerInfo.address,
                    }),
                );
            } else {
                alert('Cập nhật thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error updating info:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin.');
        }
    };

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

    const updateTotal = (items) => {
        let quantity = 0;
        let price = 0;

        items.forEach((cart) => {
            const newPrice = cart.price - (cart.price * cart.discount_percent) / 100;
            quantity += cart.quantity;
            price += cart.quantity * newPrice;
        });

        setTotalQuantity(quantity);
        setTotalPrice(price);
    };

    const handleCustomerInfoChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleCheckout = async () => {
        const checkoutData = {
            user_id: customerInfo.user_id,
            status: 1,
            discount_id: discountCode ? discountCode.id : null,
            totalQuantity,
            totalPrice,
            deliveryOption,
            paymentMethod,
            items: cartItems.map((item) => ({
                product_id: item.product_id,
                price: parseFloat(item.price),
                quantity: item.quantity,
            })),
        };

        if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
            alert('Vui lòng điền đầy đủ thông tin khách hàng');
            return;
        }

        const response = await checkoutOrder(checkoutData);

        if (response.success) {
            const clearCartResponse = await clearCart(checkoutData.user_id);
            // const paymentResult = await processVNPayPayment(response.paymentUrl);
            // if (paymentResult.success) {
            //     // Cập nhật trạng thái đơn hàng thành '2' (đã thanh toán) khi thanh toán thành công
            //     await updateOrderStatus(response.orderId, 2);
            //     // navigate('/orderSuccess');
            // } else {
            //     alert('Thanh toán không thành công. Vui lòng thử lại.');
            //     // navigate('/orderFailure');
            // }
            if (clearCartResponse.success) {
                sessionStorage.removeItem('cartItems');
                setCartItems([]);
                navigate('/orderList');
            } else {
                console.error('Lỗi khi xóa giỏ hàng:', clearCartResponse.data.message);
            }
        } else {
            alert('Có lỗi xảy ra trong quá trình thanh toán.');
        }
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

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row app__content">
                    <div className="grid__column">
                        <div className="container">
                            <section className="shopping-cart">
                                <h2>Thanh Toán</h2>
                                {cartItems.length === 0 ? (
                                    <div>
                                        <img src="/assets/img/no-cart.webp" alt="No-cart" />
                                        <a href="/product" className="button buy-now-btn">
                                            Mua Thêm
                                        </a>
                                    </div>
                                ) : (
                                    <>
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
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>

                                        <div className="customer-info">
                                            <h3>Thông Tin Khách Hàng</h3>
                                            <form>
                                                <div>
                                                    <label>Email:</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={customerInfo.email}
                                                        onChange={handleCustomerInfoChange}
                                                        readOnly
                                                    />
                                                </div>
                                                <div>
                                                    <label>Họ và Tên:</label>
                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        value={customerInfo.fullName}
                                                        onChange={handleCustomerInfoChange}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label>Số Điện Thoại:</label>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={customerInfo.phone}
                                                        onChange={handleCustomerInfoChange}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label>Địa Chỉ:</label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={customerInfo.address}
                                                        onChange={handleCustomerInfoChange}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <button type="button" onClick={handleUpdateInfo}>
                                                        Cập Nhật Thông Tin
                                                    </button>
                                                </div>
                                            </form>
                                            <div>
                                                <label>Lời Nhắn:</label>
                                                <textarea
                                                    name="message"
                                                    value={customerInfo.message}
                                                    onChange={handleCustomerInfoChange}
                                                />
                                            </div>
                                            <div>
                                                <label>Mã Giảm Giá:</label>
                                                <input
                                                    type="text"
                                                    value={discountCode}
                                                    onChange={(e) => setDiscountCode(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label>Đơn Vị Vận Chuyển:</label>
                                                <select
                                                    value={deliveryOption}
                                                    onChange={(e) => setDeliveryOption(e.target.value)}
                                                >
                                                    <option value="J&T">J&T</option>
                                                    <option value="Shopee">Shopee</option>
                                                    <option value="Lazada">Lazada</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label>Hình Thức Thanh Toán:</label>
                                                <select
                                                    value={paymentMethod}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                >
                                                    <option value="COD">Thanh Toán Khi Nhận Hàng</option>
                                                    <option value="Online">Thanh Toán Bằng VNPAY</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="payment__summary">
                                            <tr className="cart-summary">
                                                <td>Tổng Số Lượng Sản Phẩm:</td>
                                                <td>{totalQuantity}</td>
                                                <td>Thành tiền: </td>
                                                <td>
                                                    <strong>{totalPrice.toLocaleString()}</strong>
                                                </td>
                                                <td colSpan={2}>
                                                    <button onClick={handleCheckout} className="button checkout-btn">
                                                        Thanh Toán
                                                    </button>
                                                </td>
                                            </tr>
                                        </div>
                                    </>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
