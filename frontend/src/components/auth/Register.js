import React, { useState } from 'react';
import { sendOtp, verifyOtp, createPassword, createUser } from '../../api/Api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [roleId, setRoleId] = useState('');

    // Xử lý gửi OTP
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

    // Handle OTP verification and registration completion
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

    // Handle password creation after OTP verification
    const handleCreatePassword = async (event) => {
        event.preventDefault();
        const data = await createPassword(password);

        if (data.errors) {
            setErrors(data.errors);
            setSuccessMessage('');
        } else {
            setSuccessMessage(data.message);
            setErrors([]);
            handleRegister();
        }
    };

    const handleRegister = async () => {
        const userData = {
            username,
            email,
            phone_number: phoneNumber,
            address,
            password,
            role_id: roleId,
        };

        const data = await createUser(userData);

        if (data.errors) {
            setErrors([data.errors]);
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
                <div className="modal__overlay"></div>
                <div className="modal__body">
                    <form
                        onSubmit={step === 1 ? handleSendOtp : step === 2 ? handleVerifyOtp : handleCreatePassword}
                        className="auth-form"
                    >
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
                                    <div className="msg msg-danger">
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
                                    <div className="msg msg-success">
                                        {successMessage}
                                        <button className="close" onClick={() => setSuccessMessage('')}>
                                            &times;
                                        </button>
                                    </div>
                                )}

                                {/* Email input */}
                                {step === 1 && (
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
                                {step === 2 && (
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

                                {/* Password Input */}
                                {step === 3 && (
                                    <div className="auth-form__group">
                                        <input
                                            type="password"
                                            name="password"
                                            className="auth-form__input"
                                            placeholder="Create your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="auth-form__aside">
                                <p className="auth-form__policy-text">
                                    Bằng việc đăng kí, bạn đã đồng ý với Shopee về
                                    <a href="#" className="auth-form__text-link">
                                        Điều khoản dịch vụ
                                    </a>
                                    &amp;
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
                                    {step === 1 ? 'GỬI OTP' : step === 2 ? 'XÁC THỰC OTP' : 'TẠO MẬT KHẨU'}
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
        </>
    );
};

export default Register;
