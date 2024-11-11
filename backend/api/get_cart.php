<?php
require_once '../controllers/CartController.php';
require_once '../config/cors.php';
header("Content-Type: application/json");

// Khởi tạo CartController
$cartController = new CartController();

// Xác định phương thức yêu cầu HTTP
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET' && isset($_GET['userid'])) {
    // Lấy ID người dùng từ tham số yêu cầu
    $userId = intval($_GET['userid']);

    try {
        // Lấy danh sách sản phẩm trong giỏ hàng
        $cartItems = $cartController->getCartItems($userId);

        if ($cartItems) {
            // Trả về danh sách sản phẩm trong giỏ hàng nếu có
            echo json_encode([
                'status' => 'success',
                'cartItems' => $cartItems
            ]);
        } else {
            // Trả về thông báo nếu giỏ hàng trống
            echo json_encode([
                'status' => 'empty',
                'message' => 'Không có sản phẩm trong giỏ hàng'
            ]);
        }
    } catch (Exception $e) {
        // Trả về thông báo lỗi nếu có lỗi trong quá trình truy xuất dữ liệu
        echo json_encode([
            'status' => 'error',
            'message' => 'Lỗi khi lấy dữ liệu giỏ hàng: ' . $e->getMessage()
        ]);
    }
} else {
    // Trả về thông báo nếu phương thức yêu cầu không hợp lệ
    echo json_encode([
        'status' => 'error',
        'message' => 'Phương thức yêu cầu không hợp lệ'
    ]);
}
