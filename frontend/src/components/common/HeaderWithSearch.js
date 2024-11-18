import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Để điều hướng đến trang tìm kiếm
import HeaderCart from './HeaderCart'; // Giả sử bạn đã có HeaderCart component

const HeaderWithSearch = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Trạng thái lưu trữ từ khóa tìm kiếm
    const navigate = useNavigate(); // Dùng để điều hướng sau khi tìm kiếm

    // Hàm xử lý thay đổi trong ô tìm kiếm
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Hàm xử lý tìm kiếm khi nhấn nút
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn gửi form
        if (searchQuery.trim()) {
            navigate(`/product/search?query=${searchQuery}`); // Điều hướng đến trang tìm kiếm
        }
    };

    return (
        <div className="header-with-search">
            <div className="header__logo-img" id="header__logo-out">
                <a href="/" className="header__logo-link">
                    <i className="fa-brands fa-shopify fa-2xl" style={{ color: '#74C0FC', fontSize: '3em' }}></i>
                    <svg className="header__logo-img" viewBox="0 0 200 50">
                        <text x="12" y="40" fontFamily="Arial, sans-serif" fontSize="36" fill="#74C0FC">
                            Tech Store
                        </text>
                    </svg>
                </a>
            </div>
            <div className="header__search">
                <div className="header__search-input-wrap">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            name="query"
                            className="header__search-input"
                            placeholder="Nhập để tìm kiếm sản phẩm"
                            value={searchQuery}
                            onChange={handleSearchChange} // Cập nhật từ khóa tìm kiếm khi người dùng nhập
                        />
                        {/* Bạn có thể kích hoạt hoặc thêm các tính năng lịch sử tìm kiếm nếu cần */}
                        <div className="header__search-history">
                            <h3 className="header__search-history-heading">Lịch sử tìm kiếm</h3>
                            <ul className="header__search-history-list">
                                {/* Các mục lịch sử tìm kiếm sẽ được hiển thị ở đây nếu bạn triển khai */}
                            </ul>
                        </div>
                    </form>
                </div>
                <button type="submit" className="header__search-btn" onClick={handleSearchSubmit}>
                    <i className="header__search-btn-icon fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            <HeaderCart />
        </div>
    );
};

export default HeaderWithSearch;
