<?php
require_once '../models/Product_Model.php';
require_once '../controllers/Product_Controller.php';
require_once '../config/cors.php';

// Khởi tạo ProductController
$productController = new Product_Controller(new Product_Model());

// Lấy phương thức và tham số từ URL
$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'GET') {
    echo json_encode([
        "status" => "error",
        "message" => "Phương thức không được hỗ trợ"
    ]);
    exit;
}

if (!isset($_GET['product_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Thiếu product_id trong URL"
    ]);
    exit;
}

$productId = (int)$_GET['product_id'];

if ($productId <= 0) {
    echo json_encode([
        "status" => "error",
        "message" => "product_id không hợp lệ"
    ]);
    exit;
}

// Lấy thông tin sản phẩm hiện tại
$productResult = $productController->getProductById($productId);
$productData = json_decode($productResult, true);

// Kiểm tra xem sản phẩm có tồn tại không
if (!isset($productData['product']) || !is_array($productData['product'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Không tìm thấy sản phẩm"
    ]);
    exit;
}

$product = $productData['product'];

// Kiểm tra category_id
if (!isset($product['category_id']) || empty($product['category_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Sản phẩm không có category_id hợp lệ"
    ]);
    exit;
}

$categoryId = (int)$product['category_id'];

// Lấy sản phẩm liên quan
$relatedProducts = $productController->getRelatedProducts($categoryId, $productId);

// Kiểm tra kết quả trả về
if (isset($relatedProducts['status']) && $relatedProducts['status'] === 'success') {
    // Giới hạn số lượng sản phẩm liên quan (tùy chọn)
    $maxRelatedProducts = 10; // Có thể điều chỉnh số này
    $limitedProducts = array_slice(
        $relatedProducts['related_products'], 
        0, 
        $maxRelatedProducts
    );
    
    echo json_encode([
        "status" => "success",
        "related_products" => $limitedProducts
    ]);
} else {
    // Trả về mảng rỗng nếu không có sản phẩm liên quan
    echo json_encode([
        "status" => "success",
        "related_products" => []
    ]);
}