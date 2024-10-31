import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './Base.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// import ProductList from './components/ProductList';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import CategoryList from './components/CategoryList';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import Password from './components/Password';
import OrderList from './components/OrderList';
import VoucherList from './components/VoucherList';
import Order from './components/Order';
import Payment from './components/Payment';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orderList" element={<OrderList />} />
                    <Route path="/voucher" element={<VoucherList />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/password" element={<Password />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot_password" element={<ForgotPassword />} />
                    <Route path="/productDetail/:id" element={<ProductDetail />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment" element={<Payment />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
