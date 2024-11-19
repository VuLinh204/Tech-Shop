import React, { useState } from "react";
import "../../assets/css/AddCategory.css";

const AddCategory = ({ onAddSuccess }) => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isNameValid, setIsNameValid] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // Trạng thái hiển thị thông báo

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnail(reader.result);
          setSelectedFile(file);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Chỉ cho phép chọn file JPG hoặc PNG.");
        setThumbnail("");
        setSelectedFile(null);
      }
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    const regex = /^[a-zA-Z0-9]+$/;
    if (regex.test(value) && value.length <= 50) {
      setIsNameValid(true);
      setError("");
    } else {
      setIsNameValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isNameValid) {
      setError(
        "Tên danh mục không hợp lệ! Chỉ cho phép ký tự a-z, A-Z và 0-9, và không quá 50 ký tự."
      );
      return;
    }

    setMessage("");
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("thumbnail", selectedFile);

    try {
      const response = await fetch(
        "http://localhost/tech-shop/backend/api/CategoryApi.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Danh mục đã được thêm thành công");
        setName("");
        setThumbnail("");
        setSelectedFile(null);
        setShowPopup(true); // Hiển thị thông báo popup

        // Đợi thông báo hiển thị xong rồi mới chuyển trang
        setTimeout(() => {
          setShowPopup(false); // Ẩn popup sau 3 giây
          onAddSuccess(); // Gọi hàm chuyển trang sau khi hiển thị thông báo
        }, 3000);
      } else {
        setError(data.error || "Thất bại khi thêm danh mục");
        console.error("Error from server:", data.error);
      }
    } catch (error) {
      setError("Tạo danh mục thất bại, Vui lòng thử lại");
      console.error("Client error:", error.message);
    }
  };

  return (
    <div className="add-category">
      <h1>Thêm danh mục mới</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên danh mục:</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            className={isNameValid ? "" : "error"}
          />
        </div>
        <div>
          <label>Chọn hình ảnh (JPG hoặc PNG):</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            required
          />
        </div>
        {thumbnail && (
          <div className="thumbnail-preview">
            <h4>Thumbnail Preview:</h4>
            <img
              src={thumbnail}
              alt="Thumbnail Preview"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}
        <button type="submit">Thêm danh mục</button>

        {/* Hiển thị thông báo thành công hoặc lỗi */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Popup thông báo */}
        {showPopup && (
          <div className="popup-success">
            <p>Thêm danh mục thành công!</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddCategory;
