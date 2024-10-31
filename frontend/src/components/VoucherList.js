import React from 'react';

const VoucherList = () => {
    // Dữ liệu mẫu
    const currentUser = {
        id: 1,
    };

    const title = 'Danh Sách Voucher';
    const vouchers = [
        { id: 1, code: 'VOUCHER01', discount_amount: 10000, valid_from: '2024-01-01', valid_until: '2024-12-31' },
        { id: 2, code: 'VOUCHER02', discount_amount: 20000, valid_from: '2024-05-01', valid_until: '2024-12-31' },
        { id: 3, code: 'VOUCHER03', discount_amount: 15000, valid_from: '2024-03-01', valid_until: '2024-06-30' },
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
                                        Mật khẩu
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/orderList" className="manager-item__link">
                                        Đơn mua
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/voucher" className="manager-item__link active">
                                        Voucher
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="grid__column-10">
                        <br />
                        <h2>{title}</h2>
                        {/* Hiển thị thông báo thành công */}
                        {/* <div className="alert alert-success">Thông báo thành công</div> */}
                        {vouchers.length === 0 ? (
                            <p>Không có voucher nào.</p>
                        ) : (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Code</th>
                                        <th>Số tiền giảm giá</th>
                                        <th>Hiệu lực từ</th>
                                        <th>Hiệu lực đến</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vouchers.map((voucher) => (
                                        <tr key={voucher.id}>
                                            <td>{voucher.id}</td>
                                            <td>{voucher.code}</td>
                                            <td>{voucher.discount_amount} VND</td>
                                            <td>{voucher.valid_from}</td>
                                            <td>{voucher.valid_until}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoucherList;
