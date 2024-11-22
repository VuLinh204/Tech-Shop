import React, { useEffect, useState } from "react";
import "../../assets/css/Dashboard.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2"; // Thêm thư viện `react-chartjs-2` cho biểu đồ.
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [favoriteProducts, setFavoriteProducts] = useState(0);
  const [favoriteCategory, setFavoriteCategory] = useState("");

  const fetchCategories = async () => {
    try {
      // Gọi API để lấy danh mục
      const categoryResponse = await axios.get(
        "http://localhost/tech-shop/backend/api/CategoryApi.php"
      );

      // Gọi API để lấy danh sách sản phẩm
      const productResponse = await axios.get(
        "http://localhost/tech-shop/backend/api/getProducts.php"
      );

      const categories = categoryResponse.data; // Dữ liệu danh mục
      const products = productResponse.data; // Dữ liệu sản phẩm

      // Cập nhật state
      setCategories(categories);
      setTotalProducts(products.length); // Tổng số sản phẩm từ API `getProduct.php`
      setFavoriteCategory(categories[0]?.name || ""); // Danh mục đầu tiên (nếu có)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Gọi hàm fetchCategories khi component được tải
  useEffect(() => {
    fetchCategories();
  }, []);
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const chartData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map((category) => category.product_count),
        backgroundColor: categories.map(() => getRandomColor()), // Tạo màu ngẫu nhiên cho mỗi danh mục
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const total = context.dataset.data.reduce(
              (sum, val) => sum + val,
              0
            );
            const percentage = ((value / total) * 100).toFixed(2); // Tính phần trăm
            return `${value} sản phẩm (${percentage}%)`; // Hiển thị số sản phẩm và phần trăm
          },
        },
      },
    },
  };

  return (
    <div className="dashboard">
      {/* Banner */}
      <div className="dashboard-banner">
        <h1>Quản Lý Dashboard</h1>
        <p>Thống kê toàn bộ sản phẩm và danh mục.</p>
      </div>

      {/* 4 Ô Thống Kê */}
      <div className="dashboard-summary">
        <div className="summary-box">
          <h3>{totalProducts}</h3>
          <p>Tổng Số Sản Phẩm</p>
        </div>
        <div className="summary-box">
          <h3>{favoriteProducts}</h3>
          <p>Sản Phẩm Được Yêu Thích</p>
        </div>
        <div className="summary-box">
          <h3>{categories.length}</h3>
          <p>Tổng Số Danh Mục</p>
        </div>
        <div className="summary-box">
          <h3>{favoriteCategory}</h3>
          <p>Danh Mục Yêu Thích Nhất</p>
        </div>
      </div>

      {/* Biểu Đồ Tròn */}
      <div className="dashboard-chart">
        <h2>Phân Bố Danh Mục</h2>
        {categories.length > 0 ? (
          <div className="chart-container">
            <Pie data={chartData} options={chartOptions} />
          </div>
        ) : (
          <p>Không có dữ liệu để hiển thị biểu đồ.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
