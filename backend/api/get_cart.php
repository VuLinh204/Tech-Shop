<?php
require_once '../controllers/CartController.php';
require_once '../config/cors.php';
header("Content-Type: application/json");

// Khởi tạo CartController
$cartController = new CartController();

// Lấy phương thức HTTP từ yêu cầu (GET)
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Kiểm tra phương thức yêu cầu
if ($requestMethod === 'GET' && isset($_GET['userid'])) {
    // Lấy danh sách sản phẩm trong giỏ hàng
    $userId = intval($_GET['userid']);
    $cartItems = $cartController->getCartItems($userId);

    // Kiểm tra nếu có dữ liệu giỏ hàng
    if ($cartItems) {
        echo json_encode(['cartItems' => $cartItems]);
    } else {
        echo json_encode(['message' => 'Không có sản phẩm trong giỏ hàng']);
    }
} else {
    echo json_encode(["message" => "Phương thức yêu cầu không hợp lệ"]);
}
