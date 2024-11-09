import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "../../assets/css/RelatedProduct.css"; 

const RelatedProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);  // Danh sách sản phẩm liên quan
  const [page, setPage] = useState(1);  // Quản lý trang
  const [loading, setLoading] = useState(false);  // Kiểm tra xem đang tải hay không
  const [hasMore, setHasMore] = useState(true);  // Kiểm tra còn sản phẩm để tải

  useEffect(() => {
    fetchRelatedProducts();  // Gọi API khi `productId` thay đổi
  }, [productId]);

  const fetchRelatedProducts = async () => {
    if (loading || !hasMore) return;  // Nếu đang tải hoặc không còn sản phẩm thì dừng

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost/tech-shop/backend/api/relatedProducts.php?product_id=${productId}&page=${page}`
      );

      if (response.data.error) {
        console.error(response.data.error);
      } else {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setRelatedProducts((prev) => [...prev, ...response.data]);  // Thêm sản phẩm vào danh sách đã có
          setPage((prev) => prev + 1);  // Tăng trang sau khi tải
        } else {
          setHasMore(false);  // Không còn sản phẩm để tải
        }
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm kiểm tra khi người dùng cuộn gần cuối trang
  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
    if (bottom) {
      fetchRelatedProducts();  // Gọi API để tải thêm sản phẩm
    }
  };

  // Loại bỏ sản phẩm hiện tại khỏi danh sách liên quan
  const filteredRelatedProducts = relatedProducts.filter(
    (product) => product.id !== productId
  );

  return (
    <div
      className="related-products"
      onScroll={handleScroll}
      style={{ overflowY: "auto", height: "400px" }}  // Có thể thay đổi chiều cao theo nhu cầu
    >
      <h2>Sản phẩm liên quan</h2>
      {filteredRelatedProducts.length > 0 ? (
        <div className="product-list">
          {filteredRelatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>Không có sản phẩm liên quan.</p>
      )}
      {loading && <p>Đang tải...</p>}
      {!hasMore && <p>Không còn sản phẩm để hiển thị.</p>}
    </div>
  );
};

export default RelatedProducts;
