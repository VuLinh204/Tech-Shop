import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (!storedUser) {
            navigate('/login');
        } else {
            setUser(storedUser);
            setFormData({
                user_id: storedUser.id,
                username: storedUser.username,
                phone_number: storedUser.phone_number,
                address: storedUser.address,
            });
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost/tech-shop/backend/api/update_profile.php',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const result = response.data;
            if (result.success) {
                alert(result.message);
                sessionStorage.setItem('user', JSON.stringify({ ...user, ...formData }));
                setUser({ ...user, ...formData });
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra khi cập nhật.');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row app__content">
                    <div className="grid__column-2">
                        <nav className="manager">
                            <h3 className="manager__heading">Tài Khoản Của Tôi</h3>
                            <ul className="manager-list">
                                <li className="manager-item">
                                    <a href="#" className="manager-item__link active">
                                        Tài Khoản Của Tôi
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/password" className="manager-item__link">
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
                                        Voucher
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="grid__column-10">
                        <form className="profile" onSubmit={handleSubmit}>
                            <h1>Thông Tin Tài Khoản</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={user.email} disabled required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Họ và Tên:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="username"
                                    value={formData.username || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Số Điện Thoại:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone_number"
                                    value={formData.phone_number || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Địa Chỉ:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button className="btn btn--primary" type="submit">
                                Cập Nhật Thông Tin
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
