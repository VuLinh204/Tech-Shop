import React from 'react';
import ProductCard from './ProductCard';

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
];

const ProductList = () => {
    return (
        <div className="home__product">
            <div className="grid__row">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
