import React, { useState } from 'react';

// Component CreatePassword
const CreatePassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const email = new URLSearchParams(window.location.search).get('email');
    const otp = new URLSearchParams(window.location.search).get('otp');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Gửi thông tin đến backend
        try {
            const response = await fetch('/signup_create_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({ email, otp, password, password_confirmation: passwordConfirmation }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || 'Mật khẩu đã được tạo thành công!');
                setErrors([]);
                setPassword('');
                setPasswordConfirmation('');
            } else {
                setErrors(data.errors || ['Đặt lại mật khẩu thất bại, vui lòng thử lại.']);
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
                <div className="modal__overlay"></div>
                <div className="modal__body">
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-form__container">
                            <div className="auth-form__header">
                                <h3 className="auth-form__heading">Đặt lại mật khẩu</h3>
                                <a href="/signin" className="auth-form__switch-btn">
                                    Đăng nhập
                                </a>
                            </div>
                            {errors.length > 0 && (
                                <div
                                    className="alert alert-danger"
                                    style={{ maxHeight: '100px', display: 'flex', alignItems: 'center' }}
                                >
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
                            <input type="hidden" name="email" value={email} />
                            <input type="hidden" name="otp" value={otp} />
                            <div className="auth-form__form">
                                <div className="auth-form__group">
                                    <input
                                        type="password"
                                        name="password"
                                        className="auth-form__input"
                                        placeholder="Mật khẩu mới"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="auth-form__group">
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        className="auth-form__input"
                                        placeholder="Xác nhận mật khẩu"
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="auth-form__controls" style={{ marginBottom: '24px' }}>
                                <a href="/signup_verify" className="btn btn--normal auth-form__controls-back">
                                    TRỞ LẠI
                                </a>
                                <button type="submit" className="btn btn--primary">
                                    TẠO MẬT KHẨU
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreatePassword;
