import React, { useEffect, useState } from "react";
import { getUser, logout } from "../../api/Api";
import { useNavigate } from "react-router-dom";

import HeaderCart from "../../components/common/HeaderCart";
import "../../assets/css/Header.css";

import qrCode from "../../assets/img/qr_code.png";
import googlePlay from "../../assets/img/google_play.png";
import appStore from "../../assets/img/app_store.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      } else {
        const data = await getUser();
        if (data.status === "success") {
          setUser(data.user);
          sessionStorage.setItem("user", JSON.stringify(data.user));
        } else {
          console.error(data.message);
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const response = await logout();
    if (response.status === "success") {
      sessionStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } else {
      console.error(response.message);
      alert("Có lỗi xảy ra khi đăng xuất: " + response.message);
    }
  };

  return (
    <header className="header">
      <div className="grid">
        <nav className="header__navbar">
          <ul className="header__navbar-list">
            <li className="header__navbar-item header__navbar-item--has-qr header__navbar-item--separate">
              Vào cửa hàng trên ứng dụng Tech Store
              <div className="header__qr">
                <img src={qrCode} alt="QR code" className="header__qr-img" />
                <div className="header__qr-apps">
                  <a href="#" className="header__qr-link">
                    <img
                      src={googlePlay}
                      alt="Google Play"
                      className="header__qr-download-img"
                    />
                  </a>
                  <a href="#" className="header__qr-link">
                    <img
                      src={appStore}
                      alt="App Store"
                      className="header__qr-download-img"
                    />
                  </a>
                </div>
              </div>
            </li>
            <li className="header__navbar-item">
              <span className="header__navbar-title--no-pointer">Kết nối</span>
              <a
                href="https://www.facebook.com/finn.264/"
                className="header__navbar-icon-link"
              >
                <i className="header__navbar--icon fa-brands fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/im.vulinh__/"
                className="header__navbar-icon-link"
              >
                <i className="header__navbar--icon fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>
          <ul className="header__navbar-list">
            <li className="header__navbar-item header__navbar-item--has-notify">
              <a href="#" className="header__navbar-item-link">
                <i className="header__navbar-icon far fa-bell"></i>
                Thông báo
              </a>
              <div className="header__notify">
                <header className="header__notify-header">
                  <h3>Thông báo mới nhận</h3>
                </header>
                <ul className="header__notify-list">
                  <li>Thông báo 1</li>
                  <li>Thông báo 2</li>
                  <li>Thông báo 3</li>
                </ul>
                <footer className="header__notify-footer">
                  <a href="#" className="header__notify-footer-btn">
                    Xem tất cả
                  </a>
                </footer>
              </div>
            </li>
            <li className="header__navbar-item">
              <a href="#" className="header__navbar-item-link">
                <i className="header__navbar-icon fa-regular fa-circle-question"></i>
                Trợ giúp
              </a>
            </li>
            <li className="header__navbar-item header__navbar-user">
              {user ? (
                <>
                  <div
                    className="header__navbar-user-img"
                  // style={{ backgroundImage: `url(${user.avatar})` }} // Uncomment this line if user.avatar is available
                  ></div>
                  <span className="header__navbar-user-name">
                    {user.username}
                  </span>
                  <ul className="header__navbar-user-menu">
                    {user.role_id === 1 && (
                      <li className="header__navbar-user-item">
                        <a href="/profile">Tài Khoản Của Tôi</a>
                      </li>
                    )}

                    <li className="header__navbar-user-item">
                      <a href="/admin">Quản lý</a>
                    </li>
                    <li className="header__navbar-user-item">
                      <a href="/password">Mật Khẩu</a>
                    </li>
                    <li className="header__navbar-user-item">
                      <a href="/orderList">Đơn Mua</a>
                    </li>
                    <li className="header__navbar-user-item">
                      <a href="/voucher">Mã Giảm Giá</a>
                    </li>
                    <li className="header__navbar-user-item">
                      <button className="btn-logout" onClick={handleLogout}>
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <span>
                  <a className="header__navbar-item-link" href="/login">
                    Đăng nhập
                  </a>
                </span>
              )}
            </li>
          </ul>
        </nav>
        <div className="header-with-search">
          <div className="header__logo-img" id="header__logo-out">
            <a href="/" className="header__logo-link">
              <i
                className="fa-brands fa-shopify fa-2xl"
                style={{ color: "#74C0FC", fontSize: "3em" }}
              ></i>
              <svg className="header__logo-img" viewBox="0 0 200 50">
                <text
                  x="12"
                  y="40"
                  fontFamily="Arial, sans-serif"
                  fontSize="36"
                  fill="#74C0FC"
                >
                  Tech Store
                </text>
              </svg>
            </a>
          </div>
          <div className="header__search">
            <div className="header__search-input-wrap">
              <form action="/product/search" method="GET">
                <input
                  type="text"
                  name="query"
                  className="header__search-input"
                  placeholder="Nhập để tìm kiếm sản phẩm"
                />
                <div className="header__search-history">
                  <h3 className="header__search-history-heading">
                    Lịch sử tìm kiếm
                  </h3>
                  <ul className="header__search-history-list">
                    {/* Uncomment and implement search history if needed
                                        {searchHistory.length > 0 ? (
                                            searchHistory.map((query, index) => (
                                                <li key={index} className="header__search-history-item">
                                                    <a href="#">{query}</a>
                                                    <button type="button" className="header__search-history-remove">
                                                        X
                                                    </button>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="header__search-history-item">Không có lịch sử tìm kiếm.</li>
                                        )} */}
                  </ul>
                </div>
              </form>
            </div>
            <button type="submit" className="header__search-btn">
              <i className="header__search-btn-icon fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <HeaderCart />
        </div>
      </div>
    </header >
  );
};

export default Header;
