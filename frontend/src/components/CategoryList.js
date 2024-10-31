import React from 'react';
const categories = [
    { id: 1, name: 'Laptop', image: 'category1.png' },
    { id: 2, name: 'Máy tính', image: 'category2.png' },
    { id: 3, name: 'Điện thoại', image: 'category3.png' },
    { id: 4, name: 'Phụ kiện', image: 'category3.png' },
    { id: 5, name: 'Màn hình', image: 'category3.png' },
    { id: 6, name: 'Tai nghee', image: 'category3.png' },
    { id: 7, name: 'Ghế', image: 'category3.png' },
    { id: 8, name: 'Chuột', image: 'category3.png' },
    { id: 9, name: 'Bàn phím', image: 'category3.png' },
    { id: 10, name: 'Camera', image: 'category3.png' },
];

const CategoryList = (/*{ categories }*/) => {
    return (
        <div className="home__category">
            <div className="home__category-item-list">
                {categories.map((category) => (
                    <a key={category.id} href="#" className="home__category-item">
                        <div
                            className="home__category-image"
                            style={{ backgroundImage: `url(assets/img/${category.image})` }}
                        />
                        <div className="home__category-name">{category.name}</div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
