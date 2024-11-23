<?php
require_once '../models/Product_Model.php';
require_once '../config/cors.php';
class Product_Controller
{
    private $product;

    public function __construct($product)
    {
        $this->product = $product;
    }

    // Lấy tất cả sản phẩm
    public function getAllProducts()
    {
        $products = $this->product->getAllProduct();
        echo $products;
    }

    //lấy sản phẩm theo id
    public function getProductById($id)
    {
        $result = $this->product->getProductByIdModel($id);

        // Kiểm tra kết quả trả về từ model
        if ($result['status'] === 'success') {
            return json_encode(["status" => "success", "product" => $result['product']]);
        } else {
            // Nếu có lỗi, trả về thông báo lỗi
            return json_encode(["status" => "error", "message" => $result['message']]);
        }
    }
    // Tạo sản phẩm mới
    public function createProduct($product)
    {
        $result = $this->product->createProductModel($product);

        // Kiểm tra kết quả trả về từ model
        if ($result['status'] === 'success') {
            return json_encode(["status" => "success", "message" => $result['message'], "product" => $product]);
        } else {
            // Nếu có lỗi, trả về thông báo lỗi
            return json_encode(["status" => "error", "message" => $result['message']]);
        }
    }

    // Cập nhật sản phẩm
    public function updateProduct($product)
    {
        $result = $this->product->updateProduct($product);
        // Kiểm tra kết quả trả về từ model
        if ($result['status'] === 'success') {
            return json_encode(["status" => "success", "message" => $result['message']]);
        } else {
            // Nếu có lỗi, trả về thông báo lỗi
            return json_encode(["status" => "error", "message" => $result['message']]);
        }
    }

    // Xóa sản phẩm
    public function deleteProduct($id)
    {
        $result = $this->product->deleteProduct($id);
        // Kiểm tra kết quả trả về từ model
        if ($result['status'] === 'success') {
            return json_encode(["status" => "success", "message" => $result['message']]);
        } else {
            // Nếu có lỗi, trả về thông báo lỗi
            return json_encode(["status" => "error", "message" => $result['message']]);
        }
    }

    // Hàm xử lý tìm kiếm sản phẩm
    public function searchProduct($key)
    {
        $products = $this->product->searchProductAd($key);

        // Kiểm tra nếu có kết quả
        if ($products) {
            return json_encode([
                'status' => 'success',
                'data' => $products
            ]);
        } else {
            return json_encode([
                'status' => 'error',
                'message' => 'Không tìm thấy sản phẩm'
            ]);
        }
    }

    public function searchProductUser($key)
    {
        echo $this->product->searchProduct($key);
    }


    //lay san pham theo danh muc
    public function getProductByCategory($id)
    {
        $result = $this->product->getProductByCategory($id);

        // Kiểm tra kết quả trả về từ model
        if ($result['status'] === 'success') {
            return json_encode(["status" => "success", "product" => $result['product']]);
        } else {
            // Nếu có lỗi, trả về thông báo lỗi
            return json_encode(["status" => "error", "message" => $result['message']]);
        }
    }

    //lấy related product
    public function getRelatedProducts($categoryId, $excludeProductId) {
        // Add validation
        if (!isset($categoryId) || $categoryId <= 0) {
            return [
                "status" => "error",
                "message" => "Category ID không hợp lệ"
            ];
        }
    
        $relatedProducts = $this->product->getRelatedProduct($categoryId, $excludeProductId);
        
        return [
            "status" => "success",
            "related_products" => $relatedProducts
        ];
    }
}
