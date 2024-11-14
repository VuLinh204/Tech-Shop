import React, { useState } from 'react';

// Component OtpVerify
const OtpVerify = () => {
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Gửi thông tin OTP tới backend
        try {
            const response = await fetch('/users/signup_verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'), // CSRF token
                },
                body: JSON.stringify({ otp }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || 'Xác thực thành công!');
                setErrors([]);
                setOtp(''); // Reset otp
            } else {
                setErrors(data.errors || ['Xác thực thất bại, vui lòng thử lại.']);
                setSuccessMessage('');
            }
        } catch (error) {
            setErrors(['Có lỗi xảy ra. Vui lòng thử lại.']);
            setSuccessMessage('');
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
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="auth-form__container">
                                <div className="auth-form__header">
                                    <h3 className="auth-form__heading">Xác thực OTP</h3>
                                    <a href="/signin" className="auth-form__switch-btn">
                                        Đăng nhập
                                    </a>
                                </div>
                                {errors.length > 0 && (
                                    <div
                                        className="alert alert-danger"
                                        style={{ maxHeight: '50px', display: 'flex', alignItems: 'center' }}
                                    >
                                        {errors.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))}
                                        <button className="close" onClick={() => setErrors([])}>
                                            &times;
                                        </button>
                                    </div>
                                )}
                                <div className="auth-form__form">
                                    <div className="auth-form__group">
                                        <input
                                            type="text"
                                            className="auth-form__input"
                                            id="otp"
                                            name="otp"
                                            placeholder="Nhập OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="auth-form__controls" style={{ marginBottom: '24px' }}>
                                    <a href="/forgot_password" className="btn btn--normal auth-form__controls-back">
                                        TRỞ LẠI
                                    </a>
                                    <button type="submit" className="btn btn--primary">
                                        XÁC THỰC OTP
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtpVerify;
