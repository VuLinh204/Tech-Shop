import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getRelatedProducts } from "../../api/Api";
import ProductCard from "./ProductCard";
import "../../assets/css/RelatedProduct.css";

const RelatedProducts = ({ productId }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    // In RelatedProducts.js
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const relatedData = await getRelatedProducts(productId);
                // relatedData will now always be an array (empty if no products)
                setRelatedProducts(relatedData.filter(product => product.id !== productId));
            } catch (error) {
                console.error("Error fetching related products:", error);
                setRelatedProducts([]);
            }
        };

        if (productId) {
            fetchRelatedProducts();
        }
    }, [productId]);

    // Cấu hình slider react-slick
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
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
