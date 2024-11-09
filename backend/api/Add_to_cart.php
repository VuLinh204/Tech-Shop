<?php
// Include controller và cấu hình
require_once '../controllers/CartController.php';

// Kiểm tra phương thức yêu cầu
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Kiểm tra xem các tham số có được truyền vào không
    if (isset($_POST['cart_id']) && isset($_POST['product_id']) && isset($_POST['quantity'])) {
        $cartId = $_POST['cart_id'];
        $productId = $_POST['product_id'];
        $quantity = $_POST['quantity'];

        // Gọi controller để xử lý thêm sản phẩm vào giỏ hàng
        $cartController = new CartController();
        $cartController->addToCart($cartId, $productId, $quantity);
    } else {
        // Nếu thiếu tham số, trả về lỗi
        echo json_encode(['success' => false, 'message' => 'Thiếu thông tin cần thiết']);
    }
} else {
    // Nếu không phải POST request
    echo json_encode(['success' => false, 'message' => 'Phương thức yêu cầu không hợp lệ']);
}
