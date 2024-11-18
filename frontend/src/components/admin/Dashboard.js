import React from "react";
import "../../assets/css/Dashboard.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2"; // Thêm thư viện `react-chartjs-2` cho biểu đồ.
ChartJS.register(ArcElement, Tooltip, Legend);
const Dashboard = () => {
  // Dữ liệu demo
  const totalProducts = 120;
  const favoriteProducts = 15;
  const totalCategories = 10;
  const favoriteCategory = "Đồ Điện Tử";

  const chartData = {
    labels: ["Đồ Điện Tử", "Thời Trang", "Gia Dụng", "Thể Thao", "Khác"],
    datasets: [
      {
        data: [40, 25, 20, 10, 5], // % mỗi danh mục
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
          <h3>{totalCategories}</h3>
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
        <div className="chart-container">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
