// src/components/AddCategory.js
import React, { useState } from "react";
import "../assets/css/AddCategory.css"; // Import file CSS

const AddCategory = ({ onAddSuccess }) => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); // Thêm biến để lưu lỗi cụ thể hơn

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(""); // Reset message mỗi lần submit
    setError(""); // Reset error mỗi lần submit

    try {
      const response = await fetch(
        "http://localhost/tech-shop/backend/api/addCategory.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            thumbnail,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Category created successfully!");
        setName("");
        setThumbnail("");
        onAddSuccess();
      } else {
        setError(data.error || "Failed to create category");
        console.error("Error from server:", data.error); // Log lỗi từ server
      }
    } catch (error) {
      setError("Failed to create category. Please try again.");
      console.error("Client error:", error.message);
    }
  };

  return (
    <div className="add-category">
      <h1>Thêm danh mục mới</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên danh mục:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hình ảnh URL:</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Thêm danh mục</button>

        {/* Hiển thị thông báo thành công hoặc lỗi */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddCategory;
