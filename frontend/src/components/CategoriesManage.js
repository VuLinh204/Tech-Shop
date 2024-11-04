// src/components/CategoriesManage.js
import React, { useState, useEffect } from "react";
import AddCategory from "./AddCategory"; // Import component AddCategory
import EditCategory from "./EditCategory"; // Import component EditCategory
import ControlPanel from "./ControlPanel";
import Manages from "./Manages"; // Import Manages component
import "../assets/css/CategoriesManage.css"; // Import file CSS
import axios from "axios";

const CategoriesManage = () => {
  const [activeItem, setActiveItem] = useState("Danh mục");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost/tech-shop/backend/api/CategoryApi.php"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          "http://localhost/tech-shop/backend/api/CategoryApi.php",
          {
            headers: {
              "Content-Type": "application/json",
            },
            data: { id: id },
          }
        );
        fetchCategories();
      } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
      }
    } else {
      console.log("Người dùng đã hủy thao tác xóa.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsAdding(false);
    setIsEditing(false);
  };

  const handleAddCategoryClick = () => {
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleEditCategoryClick = (category) => {
    setEditCategoryData(category);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleAddSuccess = () => {
    setIsAdding(false);
    fetchCategories();
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    fetchCategories();
  };

  return (
    <div className="categories-manage app__container">
      <div className="app__container">
        <div className="grid">
          <div className="grid__row app__content">
            <div className="grid__column-2">
              <Manages activeItem={activeItem} onItemClick={handleItemClick} />{" "}
            </div>

            <div className="grid__column-10">
              <div className="category-manager">
                {activeItem === "Bảng điều khiển" ? (
                  <ControlPanel />
                ) : isAdding ? (
                  <AddCategory onAddSuccess={handleAddSuccess} />
                ) : isEditing ? (
                  <EditCategory
                    categoryData={editCategoryData}
                    onEditSuccess={handleEditSuccess}
                  />
                ) : (
                  <div>
                    <div className="category-manager__header">
                      <h1>Danh sách các danh mục</h1>
                      <button
                        className="btn btn--primary"
                        onClick={handleAddCategoryClick}
                      >
                        + Thêm
                      </button>
                    </div>
                    <table className="category-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tên danh mục</th>
                          <th>Thumbnail</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <tr key={category.id}>
                              <td>{category.id}</td>
                              <td>{category.name}</td>
                              <td>
                                <img
                                  src={`http://localhost/tech-shop/backend/public/uploads/${category.thumbnail}`} // Cập nhật đường dẫn đến hình ảnh
                                  alt="Hình ảnh"
                                  style={{ width: "100px" }}
                                />
                              </td>
                              <td>
                                <button
                                  onClick={() =>
                                    handleEditCategoryClick(category)
                                  }
                                  className="btn-edit"
                                  title="Sửa"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  onClick={() => deleteCategory(category.id)}
                                  className="btn-delete"
                                  title="Xóa"
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4">Không có danh mục nào.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="pagination">
                      <button className="btn-pagination">1</button>
                      <button className="btn-pagination">2</button>
                      <button className="btn-pagination">3</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesManage;
