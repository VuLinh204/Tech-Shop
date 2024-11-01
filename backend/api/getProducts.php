<?php
require_once '../config/database.php';  // Kết nối đến cơ sở dữ liệu
require_once '../controllers/ProductController.php';  // Kết nối đến controller
require_once '../config/cors.php';

// Khởi tạo đối tượng Database và lấy kết nối
$database = new Database();
$pdo = $database::$connection;  // Lấy kết nối

$productController = new ProductController();  // Khởi tạo ProductController mà không cần tham số

header('Content-Type: application/json'); // Thiết lập kiểu nội dung là JSON

$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : null;
$products = $productController->getAllProducts($category_id); // Lấy danh sách sản phẩm

if ($products) {
    echo json_encode($products); // Trả về danh sách sản phẩm dưới dạng JSON
} else {
    echo json_encode([]); // Trả về mảng rỗng nếu không có sản phẩm
}
    