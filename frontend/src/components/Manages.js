// src/components/Manages.js
import React from "react";

const Manages = ({ activeItem, onItemClick }) => {
  return (
    <nav className="manager">
      <h3 className="manager__heading">Quản lý</h3>
      <ul className="manager-list">
        <li className="manager-item">
          <a
            href="#"
            className={`manager-item__link ${
              activeItem === "Bảng điều khiển" ? "active" : ""
            }`}
            onClick={() => onItemClick("Bảng điều khiển")}
          >
            Bảng điều khiển
          </a>
        </li>
        <li className="manager-item">
          <a
            href="#"
            className={`manager-item__link ${
              activeItem === "Danh mục" ? "active" : ""
            }`}
            onClick={() => onItemClick("Danh mục")}
          >
            Danh mục
          </a>
        </li>
        <li className="manager-item">
          <a
            href="#"
            className={`manager-item__link ${
              activeItem === "Sản phẩm" ? "active" : ""
            }`}
            onClick={() => onItemClick("Sản phẩm")}
          >
            Sản phẩm
          </a>
        </li>
        <li className="manager-item">
          <a
            href="#"
            className={`manager-item__link ${
              activeItem === "Thanh trượt" ? "active" : ""
            }`}
            onClick={() => onItemClick("Thanh trượt")}
          >
            Thanh trượt
          </a>
        </li>
        <li className="manager-item">
          <a
            href="#"
            className={`manager-item__link ${
              activeItem === "Mã giảm giá" ? "active" : ""
            }`}
            onClick={() => onItemClick("Mã giảm giá")}
          >
            Mã giảm giá
          </a>
        </li>
        <li className="manager-item">
          <a
            href="#"
            className={`manager-item__link ${
              activeItem === "Người dùng" ? "active" : ""
            }`}
            onClick={() => onItemClick("Người dùng")}
          >
            Người dùng
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Manages;
