import React, { useState, useEffect } from 'react';
import { changePassword, getUser } from '../../api/Api';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

const Password = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (!storedUser) {
            navigate('/login');
        } else {
            console.log(storedUser);
            setUser(storedUser); // Lưu thông tin người dùng vào state
        }
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...formData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            notification.error({
                message: 'Sai mật khẩu',
                description: 'Mật khẩu mới không khớp với nhau. Vui lòng nhập lại',
                placement: 'topRight',
                duration: 3,
            });
            return;
        }
        setLoading(true);

        const result = await changePassword(formData.oldPassword, formData.newPassword, user.email, user.id);

        console.log(result);
        setLoading(false);

        //kiểm tra kết quả trả về
        if (result.status === 'success') {
            notification.success({
                message: 'Thành công',
                description: 'Bạn đã đôi mật khẩu thành công. Vui lòng đăng nhập lại',
                placement: 'topRight',
                duration: 3,
            });
            navigate('/login');
        } else if (result.status === 'error') {
            notification.error({
                message: 'Sai mật khẩu',
                description: 'Vui lòng nhập lại mật khẩu',
                placement: 'topRight',
                duration: 3,
            });
        }
        else {
            setMessage("Có lỗi xảy ra khi đổi mật khẩu");
        }

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
                                        Đổi Mật Khẩu
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
                                <input type="email" id="email" name="email" value={user.email} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="old_password">Nhập Mật Khẩu Hiện Tại:</label>
                                <input
                                    type="password"
                                    id="old_password"
                                    name="oldPassword"
                                    value={formData.oldPassword || ''}
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
                                    value={formData.newPassword || ''}
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
