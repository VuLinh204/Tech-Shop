import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../assets/css/ProductDetail.css";
import axios from "axios";
import "../../assets/css/Feedback.css";
import RelatedProducts from "./RelatedProducts";
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
  const [rating, setRating] = useState(0); // Giá trị đánh giá
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [replyTo, setReplyTo] = useState(null); // ID của bình luận đang trả lời
  const [replyText, setReplyText] = useState(""); // Nội dung trả lời
  const [replyUserName, setReplyUserName] = useState(""); // Khai báo state cho tên người dùng được trả lời

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Ràng buộc nội dung bình luận
  const validateComment = (comment) => {
    // Loại bỏ khoảng trắng đầu và cuối
    const trimmedComment = comment.trim();

    // Kiểm tra độ dài tối đa và ký tự đặc biệt
    const isValid =
      trimmedComment.length > 0 &&
      trimmedComment.length <= 255 &&
      /^[\p{L}\p{N}\p{Zs}]+$/u.test(trimmedComment); // Chỉ cho phép ký tự chữ cái, số và khoảng trắng thông thường

    return isValid;
  };

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

  const handleReply = async (e, parentId, userName) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định
    setReplyTo(Number(parentId));
    setReplyText(`@${userName} `); // Tự động điền @username vào phần trả lời
    setReplyUserName(userName); // Lưu tên người dùng trả lời
    if (!replyText.trim()) return; // Nếu không có nội dung trả lời, bỏ qua

    const response = await fetch(
      "http://localhost/tech-shop/backend/api/FeedbackApi.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          product_id: product.id,
          body: replyText,
          parent_id: parentId,
        }),
      }
    );

    const data = await response.json();
    if (data.status === "success") {
      setFeedbackList(data.feedbackList); // Cập nhật lại danh sách bình luận
      setReplyTo(null); // Đóng form trả lời
      setReplyText(""); // Reset nội dung trả lời
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    // Nếu không có nội dung trả lời, bỏ qua
    if (!replyText.trim()) return;

    // Gửi dữ liệu phản hồi lên API
    const response = await fetch(
      "http://localhost/tech-shop/backend/api/FeedbackApi.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id, // ID người dùng
          product_id: product.id, // ID sản phẩm
          body: replyText, // Nội dung trả lời
          parent_id: replyTo, // ID bình luận gốc
        }),
      }
    );

    // Kiểm tra phản hồi từ API
    const data = await response.json();
    console.log(data); // In ra để kiểm tra dữ liệu trả về từ API

    if (data.status === "success") {
      setFeedbackList(data.feedbackList); // Cập nhật lại danh sách bình luận
      setReplyTo(null); // Đóng form trả lời
      setReplyText(""); // Reset nội dung trả lời
    } else {
      // Nếu có lỗi xảy ra
      console.error("Có lỗi xảy ra khi gửi phản hồi", data.message);
    }
  };

  const handleEditFeedback = (comment) => {
    setEditFeedbackId(comment.id);
    setEditComment(comment.comment); // Set the comment in the input field
    setEditRating(comment.rating); // Set the rating in the state
    setRating(comment.rating);
  };
  const handleDeleteFeedback = async (feedbackId) => {
    // Hiển thị hộp thoại xác nhận xóa
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa bình luận này không?"
    );
    if (!isConfirmed) return; // Nếu người dùng chọn "Hủy", dừng hàm

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
      // Truyền product_id vào URL
      const response = await axios.get(
        `http://localhost/tech-shop/backend/api/ColorApi.php?product_id=${id}`
      );
      // Kiểm tra nếu response.data có đúng định dạng và chứa mảng
      if (Array.isArray(response.data.data)) {
        // Nếu có, lấy các màu sắc từ mảng data trả về
        const colorData = response.data.data.map(
          (item) => item.name || item.color || item
        );
        setColors(colorData); // Cập nhật dữ liệu màu sắc
      } else {
        // Nếu không có dữ liệu màu sắc, trả về mảng rỗng
        setColors([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu màu sắc:", error);
      setColors([]); // Cập nhật trạng thái màu sắc khi có lỗi
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

    // Kiểm tra nếu người dùng đã đăng nhập (dữ liệu người dùng được lưu trong sessionStorage)
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {
      alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng.");
      return;
    }

    const userId = user.id; // Truy cập ID người dùng từ sessionStorage
    const productId = product.id; // Lấy ID sản phẩm từ dữ liệu đã fetch
    const quantityToAdd = quantity; // Lấy số lượng sản phẩm từ input

    try {
      // Gọi API để thêm sản phẩm vào giỏ hàng
      const response = await axios.post(
        "http://localhost/tech-shop/backend/api/Add_to_cart.php", // Đường dẫn API của bạn
        new URLSearchParams({
          user_id: userId, // Gửi user_id thay cho cart_id
          product_id: productId,
          quantity: quantityToAdd,
        })
      );

      if (response.data.success) {
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
        // Cập nhật lại giỏ hàng hoặc làm gì đó sau khi thêm thành công
      } else {
        alert("Lỗi khi thêm sản phẩm vào giỏ hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra người dùng đã đăng nhập chưa
    if (!user) {
      setFeedbackMessage("Vui lòng đăng nhập để bình luận!");
      setFeedbackMessageClass("feedback-error");
      setShowToast(true);
      return;
    }
    // Hiển thị thông báo ngay cả khi không hợp lệ
    setShowToast(true);

    // Kiểm tra nếu nội dung bình luận không hợp lệ
    if (!validateComment(editComment)) {
      setFeedbackMessage("Bình luận không hợp lệ. Vui lòng kiểm tra lại.");
      setFeedbackMessageClass("feedback-error");
      return;
    }

    const url = editFeedbackId
      ? "http://localhost/tech-shop/backend/api/FeedbackApi.php"
      : "http://localhost/tech-shop/backend/api/FeedbackApi.php";
    const method = editFeedbackId ? "PUT" : "POST";
    try {
      const response = await axios({
        method: method,
        url: url,
        data: {
          id: editFeedbackId,
          user_id: user.id, // Thay thế bằng user ID thực tế
          product_id: id,
          body: editComment,

          rating: rating,
        },
      });

      if (response.data.status === "success") {
        setFeedbackMessage("Bình luận đã được gửi thành công.");
        setFeedbackMessageClass("feedback-success");
        setFeedbackList(response.data.feedbackList);
        setNewComment(""); // Reset trường nhập bình luận
        setEditFeedbackId(null); // Reset trạng thái chỉnh sửa
        setRating(0);
      } else {
        setFeedbackMessage(
          "Bạn đã bình luận cho sản phẩm này rồi. Mỗi tài khoản chỉ có thể bình luận 1 lần cho mỗi sản phẩm"
        );
        setFeedbackMessageClass("feedback-error");
      }
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
      setFeedbackMessage("Đã xảy ra lỗi khi gửi bình luận.");
      setFeedbackMessageClass("feedback-error");
    }

    // Ẩn thông báo sau 3 giây
    setTimeout(() => setShowToast(false), 3000);
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
                              className={`color-btn ${selectedColor === color ? "selected" : ""
                                }`}
                              onClick={() => setSelectedColor(color)}
                            >
                              {color}
                            </button>
                          ))}
                        </div>

                        <br />
                        <button type="submit" className="product-add-to-cart">
                          Thêm Vào Giỏ Hàng
                        </button>
                        <button type="submit" className="product-buy-now">
                          Mua Ngay
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
                          <img
                            className="rounded-circle"
                            src={`http://localhost/tech-shop/backend/public/uploads/profile.png`}
                            width="40"
                            alt="User"
                          />
                          <textarea
                            className="form-control ml-1 shadow-none textarea"
                            placeholder="Viết bình luận của bạn..."
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            maxLength="255"
                          ></textarea>
                        </div>
                        <div className="rating-stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`star ${rating >= star ? "selected" : ""
                                }`}
                              onClick={() => handleRatingChange(star)}
                            >
                              ★
                            </span>
                          ))}
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
                              setNewComment(""); // Reset bình luận mới đang nhập
                              setEditFeedbackId(null); // Xóa trạng thái chỉnh sửa nếu có
                              setEditComment(""); // Reset lại nội dung chỉnh sửa
                              setEditRating(5); // Đặt lại đánh giá mặc định
                              setRating(0); // Đặt lại rating về 0
                            }}
                          >
                            Clear
                          </button>
                        </div>
                      </form>
                      {/* Hiển thị danh sách bình luận nếu có */}
                      {feedbackList.length > 0 ? (
                        feedbackList.map((comment) => (
                          <div
                            key={comment.id}
                            className="comment bg-light p-3 rounded mb-3"
                          >
                            {/* Phần thông tin người dùng */}
                            <div className="d-flex align-items-center mb-2">
                              <img
                                className="rounded-circle mr-3"
                                src={`http://localhost/tech-shop/backend/public/uploads/profile.png`}
                                width="50"
                                alt="User"
                              />
                              <div>
                                <h6 className="mb-0 font-weight-bold">
                                  {comment.user_name}
                                </h6>
                                <small className="text-muted">
                                  {new Date(
                                    comment.created_at
                                  ).toLocaleString()}
                                </small>
                              </div>
                            </div>

                            {/* Nội dung bình luận */}
                            <p className="text-muted">{comment.comment}</p>

                            {/* Hiển thị đánh giá (ngôi sao) */}
                            <div className="comment-rating text-warning">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                  key={star}
                                  className={`fa fa-star ${comment.rating >= star
                                    ? ""
                                    : "text-secondary"
                                    }`}
                                ></i>
                              ))}
                            </div>

                            {/* Phần hành động: Trả lời, Sửa, Xóa */}
                            <div className="comment-actions mt-2">
                              <button
                                onClick={(e) =>
                                  handleReply(e, comment.id, comment.user_name)
                                } // Truyền tên người dùng vào hàm handleReply
                                className="btn btn-sm btn-link text-primary"
                              >
                                Trả lời
                              </button>

                              {/* Chỉ hiển thị nút Sửa và Xóa nếu người dùng là chủ của bình luận */}
                              {user && user.id === comment.user_id && (
                                <>
                                  <button
                                    onClick={() => handleEditFeedback(comment)}
                                    className="btn btn-sm btn-link text-info"
                                  >
                                    Sửa
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteFeedback(comment.id)
                                    }
                                    className="btn btn-sm btn-link text-danger"
                                  >
                                    Xóa
                                  </button>
                                </>
                              )}
                            </div>

                            {/* Form trả lời bình luận */}
                            {replyTo === comment.id && (
                              <div className="reply-form mt-3">
                                <form onSubmit={handleSubmitReply}>
                                  <textarea
                                    placeholder={`Viết câu trả lời của bạn... @${replyUserName}`} // Hiển thị tên người dùng được trả lời
                                    rows="3"
                                    className="form-control"
                                    value={replyText}
                                    onChange={(e) =>
                                      setReplyText(e.target.value)
                                    }
                                  ></textarea>
                                  <div className="mt-2">
                                    <button
                                      type="submit"
                                      className="btn btn-primary btn-sm"
                                    >
                                      Gửi
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setReplyTo(null);
                                        setReplyText("");
                                        setReplyUserName(""); // Xóa tên người dùng khi hủy
                                      }}
                                      className="btn btn-secondary btn-sm ml-2"
                                    >
                                      Hủy
                                    </button>
                                  </div>
                                </form>
                              </div>
                            )}
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
            <br />
            <RelatedProducts productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
