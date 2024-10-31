import React, { useState } from 'react';

const Profile = () => {
    // Dữ liệu mẫu
    const currentUser = {
        id: 1,
        email: 'example@example.com',
        name: 'Nguyễn Văn A',
        customer: {
            phone: '0123456789',
            address: '123 Đường ABC',
            image: 'avatar.png',
        },
    };

    const [formData, setFormData] = useState({
        name: currentUser.name,
        phone: currentUser.customer.phone,
        address: currentUser.customer.address,
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý cập nhật thông tin ở đây
        console.log('Cập nhật thông tin:', formData);
    };

    const imageUrl = currentUser.customer.image ? `assets/img/${currentUser.customer.image}` : null;

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
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={currentUser.email}
                                    disabled
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Họ và Tên:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Số Điện Thoại:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
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
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
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
