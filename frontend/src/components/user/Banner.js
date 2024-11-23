import React, { useState, useEffect } from 'react';
import '../../assets/css/Banner.css';

const Banner = () => {
    const [sliders, setSliders] = useState([]);  // Dữ liệu banner
    const [currentIndex, setCurrentIndex] = useState(0);  // Quản lý slide hiện tại

    // Gọi API khi component được render lần đầu
    useEffect(() => {
        fetch('http://localhost/Tech-Shop/backend/api/banners.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setSliders(data);  // Cập nhật state với dữ liệu nhận được
        })
        .catch(error => {
            console.error('Error fetching banners:', error);
        });
    }, []);  // Chạy một lần khi component mount

    // Hàm chuyển sang slide tiếp theo
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    };

    // Hàm quay lại slide trước
    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + sliders.length) % sliders.length
        );
    };

    return (
        <div className="app__banner">
            <div className="grid wide">
                <div className="row sm-gutter app__banner-content">
                    <div className="col l-8 m-12     c-12">
                        <div className="full-home-banners__main">
                            <div className="full-home-banners__main-inner">
                                {sliders.length > 0 ? (
                                    sliders.map((slider, key) => (
                                        <a
                                            href={slider.link || '#'}
                                            key={key}
                                            className={`full-home-banners__main-item ${key === currentIndex ? 'active' : ''}`}
                                        >
                                            <img
                                                src={`http://localhost/Tech-Shop/backend/public/uploads/${slider.image_url}`}
                                                alt={slider.name}
                                            />
                                        </a>
                                    ))
                                ) : (
                                    <p>No banners available</p>  // Hiển thị thông báo nếu không có banner
                                )}
                            </div>

                            {/* Các nút điều khiển */}
                            <div className="full-home-banners__main-controls">
                                <i
                                    className="carosel-btn-left fas fa-angle-left"
                                    onClick={prevSlide}
                                ></i>
                                <i
                                    className="carosel-btn-right fas fa-angle-right"
                                    onClick={nextSlide}
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
