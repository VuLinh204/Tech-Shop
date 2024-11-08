import React from 'react';

const OrderList = () => {
    // Dữ liệu mẫu
    const currentUser = {
        id: 1,
    };

    const title = 'Danh Sách Đơn Mua';
    const orders = [
        { id: '123456', total_amount: 250000, status: 'Hoàn Thành' },
        { id: '789012', total_amount: 150000, status: 'Đang Xử Lý' },
        { id: '345678', total_amount: 500000, status: 'Đã Hủy' },
    ];

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row app__content">
                    <div className="grid__column-2">
                        <nav className="manager">
                            <h3 className="manager__heading">{title}</h3>
                            <ul className="manager-list">
                                <li className="manager-item">
                                    <a href="/profile" className="manager-item__link">
                                        Tài khoản của tôi
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/password" className="manager-item__link">
                                        Mật Khẩu
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/orderList" className="manager-item__link active">
                                        Đơn Mua
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/voucher" className="manager-item__link">
                                        Voucher
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="grid__column-10">
                        <div className="container__order">
                            <h1>{title}</h1>
                            <table className="purchase-table">
                                <thead>
                                    <tr>
                                        <th>Mã Đơn Hàng</th>
                                        <th>Tổng Số Tiền</th>
                                        <th>Trạng Thái</th>
                                        <th>Thao Tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr className="purchase-item" key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{new Intl.NumberFormat('vi-VN').format(order.total_amount)} VND</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <a href={`/user/order/${order.id}`} className="btn btn--primary">
                                                    Xem Chi Tiết
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
