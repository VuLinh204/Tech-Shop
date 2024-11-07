import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../assets/css/ProductDetail.css";
import axios from "axios";
import "../../assets/css/Feedback.css";
import { getUser, logout } from "../../api/Api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [colors, setColors] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [newComment, setNewComment] = useState(""); // Nội dung bình luận mới
  const [feedbackMessageClass, setFeedbackMessageClass] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [editFeedbackId, setEditFeedbackId] = useState(null); // New state for editing feedback
  const [editComment, setEditComment] = useState(""); // Store the comment being edited
  const [editRating, setEditRating] = useState(5); // Store the rating being edited
  const [user, setUser] = useState(null);
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
  const handleEditFeedback = (comment) => {
    setEditFeedbackId(comment.id);
    setEditComment(comment.comment); // Set the comment in the input field
    setEditRating(comment.rating); // Set the rating in the state
  };
  const handleDeleteFeedback = async (feedbackId) => {
    try {
      const response = await axios.delete(
        "http://localhost/tech-shop/backend/api/FeedbackApi.php",
        { data: { id: feedbackId } }
      );

      if (response.data.success) {
        setFeedbackList(
          feedbackList.filter((comment) => comment.id !== feedbackId)
        );
        setFeedbackMessage("Bình luận đã được xóa.");
        setFeedbackMessageClass("feedback-success");
        setShowToast(true);
      } else {
        setFeedbackMessage("Lỗi khi xóa bình luận.");
        setFeedbackMessageClass("feedback-error");
        setShowToast(true);
      }

      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch (error) {
      console.error("Lỗi khi xóa bình luận:", error);
      setFeedbackMessage("Đã xảy ra lỗi khi xóa bình luận.");
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost/tech-shop/backend/api/getProduct.php?id=${id}`
      );
      const data = await response.json();
      setProduct(data);
      if (data.color && Array.isArray(data.color)) {
        setColors(data.color.map((c) => c.name || c.color || c));
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await axios.get(
        "http://localhost/tech-shop/backend/api/ColorApi.php"
      );
      const colorData = Array.isArray(response.data)
        ? response.data.map((item) => item.name || item.color || item)
        : [];
      setColors(colorData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu màu sắc:", error);
      setColors([]);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(
        `http://localhost/tech-shop/backend/api/FeedbackApi.php?product_id=${id}`
      );
      // Cập nhật feedbackList với dữ liệu nhận được từ API
      setFeedbackList(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bình luận:", error);
      setFeedbackList([]); // Đặt lại về mảng rỗng nếu có lỗi
    }
  };
  useEffect(() => {
    fetchProduct();
    fetchColors();
    fetchFeedback();
    fetchUser();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/tech-shop/backend/api/CartApi.php",
        {
          user_id: user.id, // Sử dụng user_id thích hợp
          product_id: id,
          quantity,
        }
      );

      if (response.data.success) {
        setFeedbackMessage("Sản phẩm đã được thêm vào giỏ hàng.");
        setTimeout(() => setFeedbackMessage(""), 3000);
      } else {
        console.error("Lỗi:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const url = editFeedbackId
      ? "http://localhost/tech-shop/backend/api/FeedbackApi.php" // Edit URL
      : "http://localhost/tech-shop/backend/api/FeedbackApi.php"; // Add new comment URL
    const method = editFeedbackId ? "PUT" : "POST"; // PUT for editing, POST for adding

    try {
      const response = await axios({
        method: method,
        url: url,
        data: {
          id: editFeedbackId,
          user_id: user.id, // Replace with actual user ID
          product_id: id, // The current product ID
          body: editComment,
          rating: editRating,
        },
      });

      if (response.data.status === "success") {
        setFeedbackMessage(response.data.message);
        setFeedbackMessageClass(response.data.cssClass);
        setShowToast(true);
        setFeedbackList(response.data.feedbackList);
        setNewComment(""); // Reset the input field
        setEditFeedbackId(null); // Reset the edit state
        // Do not hide the message automatically
      } else {
        setFeedbackMessage(response.data.message);
        setFeedbackMessageClass(response.data.cssClass);
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      setFeedbackMessage("Đã xảy ra lỗi khi gửi bình luận.");
      setShowToast(true);
    }
  };

  const newPrice = product?.percent_discount
    ? product.price - (product.price * product.percent_discount) / 100
    : product?.price;

  return (
    <div className="app__container">
      {feedbackMessage && (
        <div className="feedback-message">{feedbackMessage}</div>
      )}
      <div className="grid">
        <div className="grid__row app__content">
          <div className="grid__column-2">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                Home
              </Link>{" "}
              &gt;
              <Link to="/products" className="breadcrumb-link">
                Product
              </Link>{" "}
              &gt;
              <span className="breadcrumb-current">{product?.name}</span>
            </div>
          </div>
          <div className="grid__column-10">
            <section className="product-section">
              <div className="product-container">
                <div className="product-row">
                  <div className="product-image">
                    <img
                      src={`http://localhost/tech-shop/backend/public/uploads/${product?.thumbnail}`}
                      alt="Product"
                    />
                  </div>
                  <div className="product-details">
                    <h1 className="product-title">{product?.name}</h1>
                    <div className="product-prices">
                      <span className="product-price-old">
                        ₫{product?.price?.toLocaleString()}
                      </span>
                      <span className="product-price-new">
                        ₫{newPrice?.toLocaleString()}
                      </span>
                    </div>

                    <div className="product-actions">
                      <form
                        className="product-actions-form"
                        onSubmit={handleAddToCart}
                      >
                        <div className="quantity-input">
                          <button
                            type="button"
                            className="quantity-decrement"
                            onClick={decrementQuantity}
                          >
                            -
                          </button>
                          <input
                            className="product-quantity"
                            type="text"
                            value={quantity}
                            readOnly
                          />
                          <button
                            type="button"
                            className="quantity-increment"
                            onClick={incrementQuantity}
                          >
                            +
                          </button>
                        </div>
                        <br />
                        <div className="color-options">
                          {colors.map((color, index) => (
                            <button
                              key={index}
                              type="button"
                              className={`color-btn ${
                                selectedColor === color ? "selected" : ""
                              }`}
                              onClick={() => setSelectedColor(color)}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                        <br />
                        <button
                          type="submit"
                          className="btn product-add-to-cart"
                        >
                          Thêm Vào Giỏ Hàng
                        </button>
                      </form>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <br />
            <p className="product-description">{product?.description}</p>
            <br />
            <div className="container mt-5">
              <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                  <div className="d-flex flex-column comment-section">
                    {/* Hiển thị thông báo toast */}
                    {showToast && (
                      <div className={`feedback-toast ${feedbackMessageClass}`}>
                        {feedbackMessage}
                      </div>
                    )}
                    <div className="bg-light p-2 mb-2">
                      <form id="commentForm" onSubmit={handleCommentSubmit}>
                        <div className="d-flex flex-row align-items-start">
                          <textarea
                            className="form-control ml-1 shadow-none textarea"
                            placeholder="Viết bình luận của bạn..."
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="mt-2 text-right">
                          <button
                            className="btn btn-primary btn-sm shadow-none"
                            type="submit"
                          >
                            {editFeedbackId ? "Lưu Thay Đổi" : "Bình luận"}
                          </button>
                          <button
                            className="btn btn-outline-primary btn-sm ml-1 shadow-none"
                            type="button"
                            onClick={() => {
                              setEditFeedbackId(null); // Reset edit state
                              setEditComment(""); // Reset comment
                              setEditRating(5); // Reset rating
                            }}
                          >
                            Hủy
                          </button>
                        </div>
                      </form>

                      {/* Hiển thị danh sách bình luận nếu có */}
                      {feedbackList.length > 0 ? (
                        feedbackList.map((comment) => (
                          <div
                            key={comment.id}
                            className="comment bg-white p-2"
                          >
                            <div className="d-flex flex-row user-info">
                              <img
                                className="rounded-circle"
                                src={`http://localhost/tech-shop/backend/public/uploads/profile.png`}
                                width="40"
                                alt="User"
                              />
                              <div className="d-flex flex-column justify-content-start">
                                <span className="d-block font-weight-bold name">
                                  {comment.user_name}
                                </span>
                                <span className="date text-black-50">
                                  {new Date(
                                    comment.created_at
                                  ).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="text-justify comment-text">
                                {comment.comment}
                              </span>
                            </div>

                            {/* Các nút Sửa và Xóa */}
                            <div className="comment-actions">
                              <div className="comment-action-buttons">
                                <button
                                  onClick={() => handleEditFeedback(comment)}
                                  className="btn-edit"
                                  title="Sửa"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteFeedback(comment.id)
                                  }
                                  className="btn-delete"
                                  title="Xóa"
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-comments">Chưa có bình luận nào</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
