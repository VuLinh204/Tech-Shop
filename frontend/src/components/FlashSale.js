import React from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const products = [
    {
        id: 1,
        name: 'Sản phẩm 1',
        image: 'product1.png',
        price: 100000,
        percent_discount: 10,
        quantity_sold: 50,
    },
    {
        id: 2,
        name: 'Sản phẩm 2',
        image: 'product2.png',
        price: 200000,
        percent_discount: 0,
        quantity_sold: 30,
    },
    {
        id: 3,
        name: 'Sản phẩm 3',
        image: 'product3.png',
        price: 150000,
        percent_discount: 5,
        quantity_sold: 20,
    },
    {
        id: 4,
        name: 'Sản phẩm 4',
        image: 'product3.png',
        price: 150000,
        percent_discount: 5,
        quantity_sold: 20,
    },
    {
        id: 5,
        name: 'Sản phẩm 5',
        image: 'product3.png',
        price: 150000,
        percent_discount: 5,
        quantity_sold: 20,
    },
    {
        id: 6,
        name: 'Sản phẩm 6',
        image: 'product3.png',
        price: 150000,
        percent_discount: 5,
        quantity_sold: 20,
    },
    {
        id: 7,
        name: 'Sản phẩm 7',
        image: 'product3.png',
        price: 150000,
        percent_discount: 5,
        quantity_sold: 20,
    },
    {
        id: 7,
        name: 'Sản phẩm 7',
        image: 'product3.png',
        price: 150000,
        percent_discount: 5,
        quantity_sold: 20,
    },
];

const FlashSale = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,  // Number of products visible at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <div className="home__product">
            <Slider {...settings}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Slider>
        </div>
    );
};

export default FlashSale;
