import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import { getProducts } from '../../api/Api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FlashSale = () => {
    const [products, setProducts] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(); 
                setProducts(data); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []); 

    return (
        <div className='home__product'>
            <Slider {...settings}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Slider>
        </div>
    );
};

export default FlashSale;
