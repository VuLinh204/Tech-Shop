import React, { useState, useEffect } from 'react';
import '../../assets/css/payment.css';
import axios from 'axios';

const sampleCarts = [
    {
        id: 1,
        product: {
            id: 'P001',
            name: 'Sản phẩm 1',
            price: 1000000,
            percent_discount: 10,
            image: 'product1.jpg',
        },
        quantity: 2,
        size: 'M',
        color: 'Đỏ',
    },
    {
        id: 2,
        product: {
            id: 'P002',
            name: 'Sản phẩm 2',
            price: 2000000,
            percent_discount: 15,
            image: 'product2.jpg',
        },
        quantity: 1,
        size: 'L',
        color: 'Xanh',
    },
];

const Payment = () => {
    const [cartItems, setCartItems] = useState([]);

    const [carts, setCarts] = useState(sampleCarts);
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        fullName: '',
        phone: '',
        address: '',
        message: '', // Lời nhắn
    });
    const [discountCode, setDiscountCode] = useState('');
    const [deliveryOption, setDeliveryOption] = useState('J&T');
    const [paymentMethod, setPaymentMethod] = useState('COD'); // Hình thức thanh toán: COD, Online

    // Dữ liệu thông tin khách hàng lấy từ sessionStorage khi component được render
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setCustomerInfo({
                email: storedUser.email || '',
                fullName: storedUser.username || '',
                phone: storedUser.phone_number || '',
                address: storedUser.address || '',
                message: '', // Có thể để trống
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
                }
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
                    })
                );
            } else {
                alert('Cập nhật thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error updating info:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin.');
        }
    };

    // Tính toán tổng số lượng và tổng giá
    const totalQuantity = carts.reduce((total, cart) => total + cart.quantity, 0);
    const totalPrice = carts.reduce((total, cart) => {
        const discountedPrice = cart.product.price - (cart.product.price * cart.product.percent_discount) / 100;
        return total + cart.quantity * discountedPrice;
    }, 0);

    const handleCustomerInfoChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };
    

    const handleCheckout = () => {
        const checkoutData = {
            customerInfo,
            carts,
            totalQuantity,
            totalPrice,
            discountCode,
            deliveryOption,
            paymentMethod,
        };
        if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
            alert('Vui lòng điền đầy đủ thông tin khách hàng');
            return;
        }
        // Tiến hành xử lý thanh toán nếu thông tin hợp lệ
        console.log('Dữ liệu thanh toán:', checkoutData);
        alert(`Thanh toán thành công! Tổng số tiền: ${totalPrice.toLocaleString()} VND`);
    };

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row app__content">
                    <div className="grid__column">
                        <div className="container">
                            <section className="shopping-cart">
                                <h2>Thanh Toán</h2>
                                {carts.length === 0 ? (
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
                                                    <th>Tên</th>
                                                    <th>Mã Sản Phẩm</th>
                                                    <th>Size</th>
                                                    <th>Color</th>
                                                    <th>Đơn Giá (VND)</th>
                                                    <th>Số Lượng</th>
                                                    <th>Số Tiền (VND)</th>
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
                                                    <option value="Online">Thanh Toán Online</option>
                                                </select>
                                            </div>
                                        </div>

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
