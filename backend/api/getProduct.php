<?php
// api/getProduct.php
require_once '../config/database.php';  // Kết nối đến cơ sở dữ liệu
require_once '../controllers/ProductController.php';  // Kết nối đến controller
require_once '../config/cors.php';

header('Content-Type: application/json'); // Thiết lập kiểu nội dung là JSON

$productController = new ProductController(); // Khởi tạo ProductController

$id = isset($_GET['id']) ? intval($_GET['id']) : null; // Lấy ID từ URL

if ($id) {
    $product = $productController->getProductById($id); // Gọi phương thức lấy sản phẩm theo ID
    echo json_encode($product); // Trả về thông tin sản phẩm
} else {
    echo json_encode(["error" => "Invalid product ID."]);
}
