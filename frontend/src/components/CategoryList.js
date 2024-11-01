import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/CategoryList.css";

const CategoryList = ({ setProducts, setCurrentPage, productsPerPage }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleCount, setVisibleCount] = useState(10); // Số lượng danh mục hiển thị mặc định là 10
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false); // Trạng thái để kiểm tra nút Load More

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:82/tech-shop/backend/api/getCategories.php"
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
          ? `http://localhost:82/tech-shop/backend/api/getProducts.php?category_id=${selectedCategory}`
          : "http://localhost:82/tech-shop/backend/api/getProducts.php";

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
    setVisibleCount((prevCount) => prevCount + 5); // Mỗi lần nhấn nút sẽ hiển thị thêm 5 danh mục
    setIsLoadMoreVisible(true); // Hiển thị nút quay lại
  };

  const handleShowLess = () => {
    setVisibleCount(10); // Quay lại hiển thị 10 danh mục
    setIsLoadMoreVisible(false); // Ẩn nút quay lại
  };

  return (
    <div className="home__category">
      <div className="home__category-item-list">
        <div className="home__category-row">
          {categories.slice(0, visibleCount).map((category) => (
            <a
              key={category.id}
              href="#"
              className="home__category-item"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div
                className="home__category-image"
                style={{ backgroundImage: `url(${category.thumbnail})` }}
              />
              <div className="home__category-name">{category.name}</div>
            </a>
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
