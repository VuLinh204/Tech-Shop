import React, { useState } from 'react';

const Password = () => {
    // Dữ liệu mẫu
    const currentUser = {
        id: 1,
        email: 'example@example.com',
    };

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý đổi mật khẩu ở đây
        console.log('Đổi mật khẩu:', formData);
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
                                    <a href="/profile" className="manager-item__link">
                                        Tài khoản của tôi
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/password" className="manager-item__link active">
                                        Mật Khẩu
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/orderList" className="manager-item__link">
                                        Đơn Mua
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/voucher" className="manager-item__link">
                                        Mã Giảm Giá
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="grid__column-10">
                        <form className="password" onSubmit={handleSubmit}>
                            <h1>Đổi Mật Khẩu</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={currentUser.email} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="old_password">Nhập Mật Khẩu Hiện Tại:</label>
                                <input
                                    type="password"
                                    id="old_password"
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Nhập Mật Khẩu Mới:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_confirmation">Nhập Lại Mật Khẩu Mới:</label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button className="btn btn--primary" type="submit">
                                Đổi Mật Khẩu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Password;
