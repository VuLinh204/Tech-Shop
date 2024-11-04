import React, { useState, useEffect } from "react";
import "../assets/css/AddCategory.css";
import axios from "axios";

const EditCategory = ({ categoryData, onEditSuccess }) => {
  const [name, setName] = useState(categoryData ? categoryData.name : "");
  const [thumbnail, setThumbnail] = useState(
    categoryData ? categoryData.thumbnail : ""
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (categoryData) {
      setName(categoryData.name);
      setThumbnail(categoryData.thumbnail);
    }
  }, [categoryData]);

  const handleUpdateCategory = async () => {
    if (!name || !thumbnail) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      await axios.put(
        "http://localhost/tech-shop/backend/api/updateCategory.php",
        {
          id: categoryData.id,
          name,
          thumbnail,
        }
      );

      setMessage("Cập nhật danh mục thành công!");
      setError("");
      onEditSuccess();
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      setError("Đã xảy ra lỗi khi cập nhật danh mục.");
      setMessage("");
    }
  };

  return (
    <div className="add-category">
      <h2>Chỉnh sửa danh mục</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Tên danh mục</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Thumbnail</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>
        {message && <div className="message">{message}</div>}
        {error && <div className="error">{error}</div>}
        <button
          className="btn btn--primary"
          type="button"
          onClick={handleUpdateCategory}
        >
          Cập nhật danh mục
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
