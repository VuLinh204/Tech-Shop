import React from 'react';

const Order = () => {
    // Dữ liệu mẫu
    const currentUser = {
        id: 1,
    };

    const order = {
        id: '123456',
        total_amount: 250000,
        status: 'completed',
        items: [
            { product: { name: 'Sản Phẩm 1' }, quantity: 2, price: 50000 },
            { product: { name: 'Sản Phẩm 2' }, quantity: 1, price: 150000 },
        ],
    };

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row app__content">
                    <div className="grid__column-2">
                        <nav className="manager">
                            <h3 className="manager__heading">Tài Khoản Của Tôi</h3>
                            <ul className="manager-list">
                                <li className="manager-item">
                                    <a href={`/user/profile/${currentUser.id}`} className="manager-item__link">
                                        Tài khoản của tôi
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href={`/user/password/${currentUser.id}`} className="manager-item__link">
                                        Mật Khẩu
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/user/purchase" className="manager-item__link">
                                        Đơn Mua
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/user/voucher" className="manager-item__link">
                                        Voucher
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="grid__column-10">
                        <div className="container order-summary-container">
                            <h1>Tóm Tắt Đơn Hàng</h1>
                            <div className="order-details">
                                <p>
                                    <strong>Mã Đơn Hàng:</strong> {order.id}
                                </p>
                                <p>
                                    <strong>Tổng Số Tiền:</strong>{' '}
                                    {new Intl.NumberFormat('vi-VN').format(order.total_amount)} VND
                                </p>
                                <p>
                                    <strong>Trạng Thái:</strong>{' '}
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </p>
                            </div>
                            <h2>Danh Sách Sản Phẩm</h2>
                            <ul className="order-items-list">
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        <span className="item-name">{item.product.name}</span>
                                        <span className="item-quantity">Số Lượng: {item.quantity}</span>
                                        <span className="item-price">
                                            Giá: {new Intl.NumberFormat('vi-VN').format(item.price)} VND
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
