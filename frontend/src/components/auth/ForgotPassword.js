import React, { useState } from 'react';
import { sendOtp, verifyOtp, resetPassword } from '../../api/Api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    // Handle sending OTP
    const handleSendOtp = async (event) => {
        event.preventDefault();
        const data = await sendOtp(email);

        if (data.errors) {
            setErrors(data.errors);
            setSuccessMessage('');
        } else {
            setSuccessMessage(data.message);
            setStep(2);
            setErrors([]);
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = async (event) => {
        event.preventDefault();
        const data = await verifyOtp(email, otp);

        if (data.errors) {
            setErrors(data.errors);
            setSuccessMessage('');
        } else {
            setSuccessMessage(data.message);
            setStep(3);
            setErrors([]);
        }
    };

    // Handle password reset after OTP verification
    const handleResetPassword = async (event) => {
        event.preventDefault();
        const data = await resetPassword(email, newPassword);

        if (data.errors) {
            setErrors(data.errors);
            setSuccessMessage('');
        } else {
            setSuccessMessage(data.message);
            setErrors([]);
            window.location.href = '/login';
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
                                        Tech Shop
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
                                    <h3 className="auth-form__heading">Quên mật khẩu</h3>
                                    <a href="/login" className="auth-form__switch-btn">
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
                                            type="email"
                                            name="email"
                                            className="auth-form__input"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="auth-form__controls" style={{ marginBottom: '24px' }}>
                                    <a href="/login" className="btn btn--normal auth-form__controls-back">
                                        TRỞ LẠI
                                    </a>
                                    <button type="submit" className="btn btn--primary">
                                        GỬI YÊU CẦU
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

export default ForgotPassword;
