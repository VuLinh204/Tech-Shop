// src/components/ControlPanel.js
import React from "react";
import "../assets/css/ControlPanel.css"; // Tạo CSS cho ControlPanel

const ControlPanel = () => {
  return (
    <div className="control-panel">
      <div className="control-panel__top">{/* Khung lớn phía trên */}</div>
      <div className="control-panel__info">
        <div className="info-card">Tổng số lượng sản phẩm: 9999</div>
        <div className="info-card">Các sản phẩm được yêu thích nhất: ABC</div>
        <div className="info-card">Tổng số lượng danh mục: 9</div>
        <div className="info-card">
          Danh mục có nhiều sản phẩm được yêu thích nhất: ABC
        </div>
      </div>
      <div className="control-panel__chart">
        {/* Biểu đồ */}
        <img src="chart-placeholder.png" alt="Biểu đồ" />
      </div>
    </div>
  );
};

export default ControlPanel;
