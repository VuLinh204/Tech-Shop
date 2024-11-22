import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import '../../assets/css/RelatedProduct.css';

const RelatedProducts = ({ productId }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        fetchRelatedProducts();
    }, [productId]);

    const fetchRelatedProducts = async () => {
        try {
            const response = await axios.get(
                `http://localhost/tech-shop/backend/api/relatedProducts.php?product_id=${productId}`,
            );

            if (response.data.error) {
                console.error(response.data.error);
            } else {
                const uniqueProducts = Array.from(new Set(response.data.map((product) => product.id)))
                    .map((id) => response.data.find((product) => product.id === id))
                    .filter((product) => product.id !== productId); // Exclude the selected product

                setRelatedProducts(uniqueProducts);
            }
        } catch (error) {
            console.error('Error fetching related products:', error);
        }
    };

    // Slider settings for react-slick
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4, // Adjust as per design requirements
        slidesToScroll: 1,
    };

    return (
        <div className="related-products">
            <h2>Sản phẩm liên quan</h2>
            {relatedProducts.length > 0 ? (
                <Slider {...sliderSettings}>
                    {relatedProducts.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </Slider>
            ) : (
                <p>Không có sản phẩm liên quan.</p>
            )}
        </div>
    );
};

export default RelatedProducts;
