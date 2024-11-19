// src/components/CategoriesManage.js
import React, { useState, useEffect } from "react";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import "../../assets/css/CategoriesManage.css";
import axios from "axios";
import Pagination from "../common/Pagination_admin";
import Dashboard from "./Dashboard";



const CategoriesManage = () => {
  const [activeItem, setActiveItem] = useState("Danh mục");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const deleteCategory = async (encryptedId) => {
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
            data: { id: encryptedId }, // Gửi ID đã mã hóa
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
  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = categories.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(categories.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (


    <div className="grid__column-10">
      <div className="category-manager">
        {activeItem === "Bảng điều khiển" ? (
          <Dashboard />
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
                {currentItems.length > 0 ? (
                  currentItems.map((category) => (
                    <tr key={category.id}>
                      <td>{category.original_id}</td>
                      <td>{category.name}</td>
                      <td>
                        <img
                          src={`http://localhost/tech-shop/backend/public/uploads/${category.thumbnail}`}
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
                          onClick={() => deleteCategory(category.id)} // Sử dụng ID mã hóa để xóa
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
              ;
            </table>
            <div className="pagination">
              <Pagination
                totalPages={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>



        )}
      </div>
    </div >

  );
};

export default CategoriesManage;
