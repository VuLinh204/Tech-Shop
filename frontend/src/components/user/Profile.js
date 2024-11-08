import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (!storedUser) {
            navigate('/login');
        } else {
            setUser(storedUser); // Lưu thông tin người dùng vào state
        }
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>; // Có thể hiển thị thông báo tải dữ liệu
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
                        <form className="profile">
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
                                    name="name"
                                    value={user.username}
                                    // onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Số Điện Thoại:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={user.phone_number}
                                    // onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Địa Chỉ:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={user.address}
                                    // onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="image">Ảnh Đại Diện:</label>
                                {imageUrl ? (
                                    <div
                                        className="profile__avatar"
                                        style={{ backgroundImage: `url(${imageUrl})` }}
                                    ></div>
                                ) : (
                                    <p>Không có ảnh đại diện</p>
                                )}
                                <input type="file" id="image" name="image" onChange={handleChange} />
                            </div> */}
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
