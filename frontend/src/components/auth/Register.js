import React, { useState } from 'react';
import { sendOtp, verifyOtp } from '../../api/Api';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    // Handle email submission and sending OTP
    const handleSendOtp = async (event) => {
        event.preventDefault();
        const data = await sendOtp(email);
        if (data.errors) {
            setErrors(data.errors);
        } else {
            setSuccessMessage(data.message || 'OTP sent to your email.');
            setIsOtpSent(true);
            setErrors([]);
        }
    };

    // Handle OTP verification and registration completion
    const handleVerifyOtp = async (event) => {
        event.preventDefault();
        const data = await verifyOtp(email, otp);
        if (data.errors) {
            setErrors(data.errors);
        } else {
            setSuccessMessage(data.message || 'Registration successful!');
            setErrors([]);
            setEmail('');
            setOtp('');
            setIsOtpSent(false);
        }
    };

    return (
        <>
            <header
                className="header"
                style={{ backgroundImage: 'linear-gradient(0, rgb(0 31 63 / 0%), rgb(0 0 0 / 19%))' }}
            >
                <div className="grid">
                    <div className="header-with-search">
                        <div className="header__logo-img" id="header__logo-out">
                            <a href="/" className="header__logo-link">
                                <i
                                    className="fa-brands fa-shopify fa-2xl"
                                    style={{ color: '#74C0FC', fontSize: '3em' }}
                                ></i>
                                <svg className="header__logo-img" viewBox="0 0 200 50">
                                    <text x="12" y="40" fontFamily="Arial, sans-serif" fontSize="36" fill="#74C0FC">
                                        GenZ Store
                                    </text>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <div className="modal">
                <div class="area">
                    <ul className="circles">
                        {[...Array(10)].map((_, i) => (
                            <li key={i}></li>
                        ))}
                    </ul>
                    <div className="modal__body">
                        <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="auth-form">
                            <div className="auth-form__container">
                                <div className="auth-form__header">
                                    <h3 className="auth-form__heading">Đăng ký</h3>
                                    <a href="/login" className="auth-form__switch-btn">
                                        Đăng nhập
                                    </a>
                                </div>
                                <div className="auth-form__form">
                                    {/* Display error messages */}
                                    {errors.length > 0 && (
                                        <div className="alert alert-danger">
                                            <ul>
                                                {errors.map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                            <button className="close" onClick={() => setErrors([])}>
                                                &times;
                                            </button>
                                        </div>
                                    )}
                                    {successMessage && (
                                        <div className="alert alert-success">
                                            {successMessage}
                                            <button className="close" onClick={() => setSuccessMessage('')}>
                                                &times;
                                            </button>
                                        </div>
                                    )}

                                    {/* Email input */}
                                    {!isOtpSent && (
                                        <div className="auth-form__group">
                                            <input
                                                type="email"
                                                name="email"
                                                className="auth-form__input"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                aria-describedby="emailHelp"
                                            />
                                            <small id="emailHelp" className="form-text text-muted">
                                                Chúng tôi sẽ gửi OTP tới địa chỉ email này. Đảm bảo nó hợp lệ và có thể truy
                                                cập được.
                                            </small>
                                        </div>
                                    )}

                                    {/* OTP Input */}
                                    {isOtpSent && (
                                        <div className="auth-form__group">
                                            <input
                                                type="text"
                                                name="otp"
                                                className="auth-form__input"
                                                placeholder="Enter OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                required
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="auth-form__aside">
                                    <p className="auth-form__policy-text">
                                        Bằng việc đăng kí, bạn đã đồng ý về 
                                        <a href="#" className="auth-form__text-link">
                                            Điều khoản dịch vụ
                                        </a>
                                        & 
                                        <a href="#" className="auth-form__text-link">
                                            Chính sách bảo mật
                                        </a>
                                    </p>
                                </div>
                                <div className="auth-form__controls">
                                    <a href="/login" className="btn btn--normal auth-form__controls-back">
                                        TRỞ LẠI
                                    </a>
                                    <button type="submit" className="btn btn--primary">
                                        {isOtpSent ? 'XÁC THỰC OTP' : 'GỬI OTP'}
                                    </button>
                                </div>
                            </div>

                            <div className="auth-form__socials">
                                <a href="#" className="auth-form__socials--facebook btn btn--size-s btn--with-icon">
                                    <i className="auth-form__socials-icon fa-brands fa-square-facebook"></i>
                                    <span className="auth-form__socials-title">Kết nối với Facebook</span>
                                </a>
                                <a href="#" className="auth-form__socials--google btn btn--size-s btn--with-icon">
                                    <i className="auth-form__socials-icon fa-brands fa-google"></i>
                                    <span className="auth-form__socials-title auth-form__socials-title--google">
                                        Kết nối với Google
                                    </span>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
