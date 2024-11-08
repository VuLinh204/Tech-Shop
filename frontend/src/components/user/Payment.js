import React, { useState } from 'react';

// Dữ liệu mẫu
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
    const [carts, setCarts] = useState(sampleCarts);

    // Tính toán tổng số lượng và tổng giá
    const totalQuantity = carts.reduce((total, cart) => total + cart.quantity, 0);
    const totalPrice = carts.reduce((total, cart) => {
        const discountedPrice = cart.product.price - (cart.product.price * cart.product.percent_discount) / 100;
        return total + cart.quantity * discountedPrice;
    }, 0);

    const handleQuantityChange = (cartId, change) => {
        setCarts((prevCarts) =>
            prevCarts.map((cart) =>
                cart.id === cartId ? { ...cart, quantity: Math.max(1, cart.quantity + change) } : cart,
            ),
        );
    };

    const handleRemoveItem = (cartId) => {
        setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== cartId));
    };

    const handleCheckout = () => {
        alert(`Thanh toán với tổng số tiền: ${totalPrice.toLocaleString()} VND`);
    };

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row app__content">
                    <div className="grid__column">
                        <div className="container">
                            <section className="shopping-cart">
                                <div className="grid__row">
                                    <div className="grid__column">
                                        <h2>Thanh Toán</h2>
                                        <div className="cart-actions">
                                            {carts.length === 0 ? (
                                                <>
                                                    <img src="/assets/img/no-cart.webp" alt="No-cart" />
                                                    <a href="/product" className="button buy-now-btn">
                                                        Mua Thêm
                                                    </a>
                                                </>
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
                                                        {carts.map((cart) => {
                                                            const newPrice =
                                                                cart.product.price -
                                                                (cart.product.price * cart.product.percent_discount) /
                                                                    100;
                                                            return (
                                                                <tr key={cart.id}>
                                                                    <td>
                                                                        <a href={`/user/detail/${cart.product.id}`}>
                                                                            <img
                                                                                src={`/assets/img/${cart.product.image}`}
                                                                                alt="Product"
                                                                                style={{ width: '100px' }}
                                                                            />
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <a href={`/user/detail/${cart.product.id}`}>
                                                                            {cart.product.name}
                                                                        </a>
                                                                    </td>
                                                                    <td>{cart.product.id}</td>
                                                                    <td>{cart.size}</td>
                                                                    <td>{cart.color}</td>
                                                                    <td>{newPrice.toLocaleString()}</td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleQuantityChange(cart.id, -1)
                                                                            }
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <span>{cart.quantity}</span>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleQuantityChange(cart.id, 1)
                                                                            }
                                                                        >
                                                                            +
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
                                                                            Xóa
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                        <tr>
                                                            <td colSpan="2" className="text-right">
                                                                Tổng Số Lượng Sản Phẩm:
                                                            </td>
                                                            <td colSpan="2" id="total-quantity">
                                                                {totalQuantity}
                                                            </td>
                                                            <td colSpan="2">Tổng Số Tiền:</td>
                                                            <td colSpan="2">
                                                                <strong id="total-price">
                                                                    {totalPrice.toLocaleString()}
                                                                </strong>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    onClick={handleCheckout}
                                                                    className="button checkout-btn"
                                                                >
                                                                    Thanh Toán
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
