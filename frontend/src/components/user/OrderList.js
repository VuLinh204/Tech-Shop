import React, { useEffect, useState } from "react";
import { getUser } from "../../api/Api";

const OrderList = () => {
  const title = "Danh Sách Đơn Mua";

  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      const data = await getUser();
      if (data.status === "success") {
        setUser(data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.error(data.message);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `http://localhost/tech-shop/backend/api/OrderApi.php?user_id=${user.id}`
        );
        const data = await response.json();

        console.log("Response từ API:", data); // Debug
        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error("Lỗi từ API:", data.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchOrders();
  }, [user]);

  useEffect(() => {
    console.log("Orders state updated:", orders); // Debug
  }, [orders]);

  return (
    <div className="app__container">
      <div className="grid">
        <div className="grid__row app__content">
          <div className="grid__column-2">
            <nav className="manager">
              <h3 className="manager__heading">{title}</h3>
              <ul className="manager-list">
                <li className="manager-item">
                  <a href="/profile" className="manager-item__link">
                    Tài khoản của tôi
                  </a>
                </li>
                <li className="manager-item">
                  <a href="/password" className="manager-item__link">
                    Mật Khẩu
                  </a>
                </li>
                <li className="manager-item">
                  <a href="/orderList" className="manager-item__link active">
                    Đơn Mua
                  </a>
                </li>
                <li className="manager-item">
                  <a href="/voucher" className="manager-item__link">
                    Voucher
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="grid__column-10">
            <div className="container__order">
              <h1>{title}</h1>
              <table className="purchase-table">
                <thead>
                  <tr>
                    <th>Mã Đơn Hàng</th>
                    <th>Tổng Số Tiền</th>
                    <th>Trạng Thái</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr className="purchase-item" key={order.id}>
                        <td>{order.id}</td>
                        <td>
                          {new Intl.NumberFormat("vi-VN").format(
                            order.total_amount
                          )}{" "}
                          VND
                        </td>
                        <td>{order.status}</td>
                        <td>
                          <a
                            href={`/user/order/${order.id}`}
                            className="btn btn--primary"
                          >
                            Xem Chi Tiết
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">Không có đơn hàng nào.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
