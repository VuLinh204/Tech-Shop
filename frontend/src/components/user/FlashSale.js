import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import { getProducts } from '../../api/Api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FlashSale = () => {
    const [saleProducts, setSaleProducts] = useState([]);
    const [sliderRef, setSliderRef] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                const saleItems = data.filter(product => product.discount_percent > 30);
                setSaleProducts(saleItems);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const settings = {
        dots: true,
        infinite: false, 
        speed: 500,
        slidesToShow: Math.min(5, saleProducts.length),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        afterChange: (current) => {
            // If at the last slide, snap back to the first slide
            if (current === saleProducts.length - 1 && sliderRef) {
                setTimeout(() => {
                    sliderRef.slickGoTo(0);
                }, 3000);
            }
        }
    };

    return (
        <div className="home__product">
            {saleProducts.length > 0 ? (
                <Slider ref={slider => setSliderRef(slider)} {...settings}>
                    {saleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Slider>
            ) : (
                <p>No products on sale at the moment.</p>
            )}
        </div>
    );
};

export default FlashSale;
