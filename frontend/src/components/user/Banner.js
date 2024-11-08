import React from 'react';
import '../../assets/css/Banner.css';

import Banner1 from '../../assets/img/banner1.jpg';
import Banner2 from '../../assets/img/banner1.jpg';
import Banner3 from '../../assets/img/banner1.jpg';
import Banner4 from '../../assets/img/banner1.jpg';

const Banner = (
    {
        /* sliders */
    },
) => {
    // Dữ liệu mẫu
    const sliders = [
        { img_path: Banner1, name: 'Banner 1' },
        { img_path: Banner2, name: 'Banner 2' },
        { img_path: Banner3, name: 'Banner 3' },
        { img_path: Banner4, name: 'Banner 4' },
    ];
    return (
        <div className="app__banner">
            <div className="grid wide">
                <div className="row sm-gutter app__banner-content">
                    <div className="col l-8 m-12 c-12">
                        <div className="full-home-banners__main">
                            <div className="full-home-banners__main-inner">
                                {sliders.map((slider, key) => (
                                    <a
                                        href="#"
                                        key={key}
                                        className={`full-home-banners__main-item ${key === 0 ? 'active' : ''}`}
                                    >
                                        <img src={slider.img_path} alt={slider.name} />
                                    </a>
                                ))}
                            </div>
                            <div className="full-home-banners__main-controls">
                                <i className="carosel-btn-left fas fa-angle-left"></i>
                                <i className="carosel-btn-right fas fa-angle-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
