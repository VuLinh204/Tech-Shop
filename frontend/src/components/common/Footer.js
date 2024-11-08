import React from 'react';
import '../../assets/css/Footer.css';

import qrCode from '../../assets/img/qr_code.png';
import googlePlay from '../../assets/img/google_play.png';
import appStore from '../../assets/img/app_store.png';

function Footer() {
    return (
        <footer className="footer">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__column-2-4">
                        <h3 className="footer__heading">Chăm sóc khách hàng</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="#" className="footer-item__link">
                                    Trung tâm trợ giúp
                                </a>
                                <a href="#" className="footer-item__link">
                                    Hướng dẫn mua hàng
                                </a>
                                <a href="#" className="footer-item__link">
                                    Chính sách vận chuyển
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid__column-2-4">
                        <h3 className="footer__heading">Về chúng tôi</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="#" className="footer-item__link">
                                    Tuyển dụng
                                </a>
                                <a href="#" className="footer-item__link">
                                    Điều khoản
                                </a>
                                <a href="#" className="footer-item__link">
                                    Giới thiệu
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid__column-2-4">
                        <h3 className="footer__heading"></h3>
                    </div>
                    <div className="grid__column-2-4">
                        <h3 className="footer__heading">Theo dõi</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="https://www.facebook.com/finn.264/" className="footer-item__link">
                                    <i className="footer-item__icon fa-brands fa-facebook"></i>
                                    Facebook
                                </a>
                                <a href="https://www.instagram.com/im.vulinh__/" className="footer-item__link">
                                    <i className="footer-item__icon fa-brands fa-instagram"></i>
                                    Instagram
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/linh-v%C5%A9-9856a2305/"
                                    className="footer-item__link"
                                >
                                    <i className="footer-item__icon fa-brands fa-linkedin"></i>
                                    Linkedin
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid__column-2-4">
                        <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
                        <div className="footer__download">
                            <img src={qrCode} alt="Download QR" className="footer__download-qr" />
                            <div className="footer__download-apps">
                                <a href="#" className="footer__download-apps-link">
                                    <img src={googlePlay} alt="Google play" className="footer__download-apps-img" />
                                </a>
                                <a href="#" className="footer__download-apps-link">
                                    <img src={appStore} alt="App store" className="footer__download-apps-img" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="grid">
                    <div className="footer__checked">
                        <p className="footer__checked-text"> CD2 NhomK</p>
                    </div>
                    <div className="footer__info">
                        <p className="footer__info-text">
                            Địa chỉ số 53,đường Võ Văn Ngân,phường Linh Chiểu,thành phố Thủ Đức,thành phố Hồ Chí Minh
                        </p>
                        <p className="footer__info-text">© 2023 - Bản quyền thuộc về NK</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
