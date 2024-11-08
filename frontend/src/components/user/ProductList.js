import React, { useState, useEffect } from "react";
import { getProducts } from "../../api/Api";
import ProductCard from "./ProductCard";
import Pagination from "../common/Pagination_admin";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="home__product">
      <div className="grid__row">
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        totalPages={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
