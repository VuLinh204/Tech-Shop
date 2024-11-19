// src/components/Manages.js
import React, { useState } from 'react';
import { BarChartOutlined, UnorderedListOutlined, ProductOutlined, DownSquareOutlined, UserOutlined, SwapOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import CategoriesManage from "./CategoriesManage";
import AdminProduct from "./AdminProduct";
import Dashboard from "./Dashboard";

const renderPage = (key) => {
  switch (key) {
    case 'Dasboard':
      return (
        <Dashboard />
      )
    case 'Category':
      return (
        <CategoriesManage />
      )
    case 'Product':
      return (
        <AdminProduct />
      )
    default:
      return <></>
  }
}

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const AdminPage = () => {
  const items = [
    getItem('Bảng điều khiển', 'Dasboard', <BarChartOutlined />),
    getItem('Danh mục', 'Category', <UnorderedListOutlined />),
    getItem('Sản phẩm', 'Product', <ProductOutlined />),
    getItem('Thanh trượt', 'Slider', <SwapOutlined />),
    getItem('Mã giảm Giá', 'Discount_percent', <DownSquareOutlined />),
    getItem('Người dùng', 'User', <UserOutlined />),

  ];
  const rootSubmenuKeys = ['Dasboard', 'Category', 'Product'];
  const [keySelected, setKeySelected] = useState("Dasboard");
  const [openKeys, setOpenKeys] = useState(['Dasboard']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }
  const handlOnclick = ({ key }) => {
    setKeySelected(key);
  }
  return (
    <div className="categories-manage app__container">
      <div className="app__container">
        <div className="grid">
          <div className="grid__row app__content">
            <div className="grid__column-2">
              <nav className="manager">
                <h3 className="manager__heading">Quản lý</h3>
                <Menu
                  mode="inline"
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                  style={{
                    width: 256,
                  }}
                  items={items}
                  onClick={handlOnclick}
                />
              </nav>
              {/* <Manages activeItem={activeItem} onItemClick={handleItemClick} />{' '} */}
            </div>
            {renderPage(keySelected)}
          </div>
        </div>
      </div>
    </div>

  );

}
export default AdminPage;
