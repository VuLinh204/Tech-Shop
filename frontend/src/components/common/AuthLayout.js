import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <Header />
            <div className="auth-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;
