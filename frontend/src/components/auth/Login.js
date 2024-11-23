
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Header.css";
import "../../assets/css/Alert.css";

// Component Login
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Gửi thông tin đăng nhập tới backend
    try {
      const response = await axios.post(
        "http://localhost/Tech-Shop/backend/api/login.php",
        {
          email,
          password,
        }
      );

      const data = response.data;

      if (data.status === "success") {
        setSuccessMessage(data.message);
        setErrorMessage("");
        sessionStorage.setItem("user", JSON.stringify(data.user));

        // Thực hiện chuyển hướng hoặc xử lý sau khi đăng nhập thành công
        if (data.user.role_id === 1) {
          // Giả sử role_id = 1 là admin
          setTimeout(() => navigate("/admin/controlPanel"), 1000);
        } else {
          setTimeout(() => navigate("/home"), 1000);
        }
      } else {
        setErrorMessage(data.message || "Đăng nhập thất bại");
        setSuccessMessage("");
        console.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Trường hợp backend trả về lỗi với mã trạng thái HTTP khác 200
        const { status } = error.response;
        const data = error.response.data;

        if (status === 404) {
          setErrorMessage("Người dùng không tồn tại.");
        } else if (status === 401) {
          setErrorMessage("Mật khẩu không chính xác.");
        } else if (status === 400) {
          setErrorMessage(data.message || "Dữ liệu đầu vào không hợp lệ.");
        } else {
          setErrorMessage("Đã xảy ra lỗi không xác định.");
        }
      } else {
        // Lỗi khác không liên quan đến phản hồi HTTP (ví dụ: không kết nối được server)
        setErrorMessage(
          "Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối."
        );
      }
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header
        className="header"
        style={{
          backgroundImage:
            "linear-gradient(0, rgb(0 31 63 / 0%), rgb(0 0 0 / 19%))",
        }}
      >
        <div className="grid">
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
                  <h3 className="auth-form__heading">Đăng nhập</h3>
                  <a href="/register" className="auth-form__switch-btn">
                    Đăng ký
                  </a>
                </div>

                <div className="auth-form__form">
                  {errorMessage && (
                    <div className="msg msg-danger">
                      <ul className="msg-ul">
                        <li>{errorMessage}</li>
                      </ul>
                      <button
                        className="close"
                        onClick={() => setErrorMessage("")}
                      >
                        &times;
                      </button>
                    </div>
                  )}
                  {successMessage && (
                    <div className="msg msg-success">
                      {successMessage}
                      <button
                        className="close"
                        onClick={() => setSuccessMessage("")}
                      >
                        &times;
                      </button>
                    </div>
                  )}

                  <div className="auth-form__group">
                    <input
                      type="email"
                      name="email"
                      className="auth-form__input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="auth-form__group">
                    <input
                      type="password"
                      name="password"
                      className="auth-form__input"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-form__aside">
                  <div className="auth-form__help">
                    <a
                      href="/forgot_password"
                      className="auth-form__help-link auth-form__help-forgot"
                    >
                      Quên mật khẩu
                    </a>
                    <span className="auth-form__help-separate"></span>
                    <a href="/help" className="auth-form__help-link">
                      Cần trợ giúp?
                    </a>
                  </div>
                </div>

                <div className="auth-form__controls">
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
                  </button>
                </div>
              </div>

              <div className="auth-form__socials">
                <a
                  href="/auth/facebook"
                  className="auth-form__socials--facebook btn btn--size-s btn--with-icon"
                >
                  <i className="auth-form__socials-icon fa-brands fa-square-facebook"></i>
                  <span className="auth-form__socials-title">
                    Kết nối với FaceBook
                  </span>
                </a>
                <a
                  href="/auth/google"
                  className="auth-form__socials--google btn btn--size-s btn--with-icon"
                >
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

export default Login;
