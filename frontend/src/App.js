import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './Base.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './components/common/Main';
import ProductDetail from './components/user/ProductDetail';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Cart from './components/user/Cart';
import CategoryList from './components/user/CategoryList';
import ForgotPassword from './components/auth/ForgotPassword';
import Profile from './components/user/Profile';
import Password from './components/user/Password';
import OrderList from './components/user/OrderList';
import VoucherList from './components/user/VoucherList';
import Order from './components/user/Order';
import Payment from './components/user/Payment';
import CategoriesManage from './components/admin/CategoriesManage';
import ControlPanel from './components/admin/ControlPanel';

// const isAuthenticated = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return user && user.role_id;
// };

const ProtectedRoute = ({ element, allowedRoles }) => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role_id)) {
        return <Navigate to="/" replace />;
    }

    return element;
};

function App() {
    return (
        <Router>
            <div className="app">
                <Header />

                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot_password" element={<ForgotPassword />} />

                    {/* Routes yêu cầu người dùng đăng nhập */}
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} allowedRoles={[2]} />} />
                    <Route path="/password" element={<ProtectedRoute element={<Password />} allowedRoles={[2]} />} />
                    <Route path="/orderList" element={<ProtectedRoute element={<OrderList />} allowedRoles={[2]} />} />
                    <Route path="/order" element={<ProtectedRoute element={<Order />} allowedRoles={[2]} />} />
                    <Route path="/voucher" element={<ProtectedRoute element={<VoucherList />} allowedRoles={[2]} />} />

                    {/* Routes không yêu cầu đăng nhập */}
                    <Route path="/productDetail/:id" element={<ProductDetail />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment" element={<Payment />} />

                    {/* Routes dành riêng cho admin */}
                    <Route
                        path="/categories/manages"
                        element={<ProtectedRoute element={<CategoriesManage />} allowedRoles={[1]} />}
                    />
                    <Route
                        path="/categories/controlpanel"
                        element={<ProtectedRoute element={<ControlPanel />} allowedRoles={[1]} />}
                    />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
