import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/CategoryList.css";

const CategoryList = ({ setProducts, setCurrentPage, productsPerPage }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleCount, setVisibleCount] = useState(12); // Số lượng danh mục hiển thị mặc định là 12
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false); // Trạng thái để kiểm tra nút Load More

  useEffect(() => {
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
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `http://localhost/tech-shop/backend/api/getProducts.php?category_id=${selectedCategory}`
          : "http://localhost/tech-shop/backend/api/getProducts.php";

        const response = await axios.get(url);
        let productData = Array.isArray(response.data) ? response.data : [];
        productData.sort((a, b) =>
          sortOrder === "desc" ? b.price - a.price : a.price - b.price
        );
        setProducts(productData);
        setCurrentPage(1);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProducts();
  }, [selectedCategory, sortOrder, setProducts, setCurrentPage]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Mỗi lần nhấn nút sẽ hiển thị thêm 6 danh mục
    setIsLoadMoreVisible(true); // Hiển thị nút quay lại
  };

  const handleShowLess = () => {
    setVisibleCount(12); // Quay lại hiển thị 10 danh mục
    setIsLoadMoreVisible(false); // Ẩn nút quay lại
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    const productSection = document.getElementById("product-section"); // Đặt id cho mục hiển thị sản phẩm
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" }); // Cuộn xuống phần sản phẩm
    }
  };

  return (
    <div className="home__category">
      <div className="home__category-item-list">
        <div className="home__category-row">
          {categories.slice(0, visibleCount).map((category) => (
            <div
              key={category.id}
              className="home__category-item"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div
                className="home__category-image"
                style={{
                  backgroundImage: `url(http://localhost/tech-shop/backend/public/uploads/${category.thumbnail})`,
                }}
              />

              <div className="home__category-name">{category.name}</div>
            </div>
          ))}
        </div>
        {/* Chỉ hiển thị nút "Load More" nếu còn danh mục chưa hiển thị */}
        {visibleCount < categories.length && (
          <button className="load-more" onClick={handleLoadMore}>
            Load More
          </button>
        )}
        {/* Nút để quay lại hiển thị ban đầu */}
        {isLoadMoreVisible && (
          <button className="show-less" onClick={handleShowLess}>
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
