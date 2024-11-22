<?php

// Kết nối đến controller

use GuzzleHttp\Psr7\Response;

require_once '../controllers/CartController.php';
require_once '../config/database.php';
require_once '../config/cors.php';

// Xử lý các yêu cầu API
$requestMethod = $_SERVER['REQUEST_METHOD'];
$cartController = new CartController();

// Kiểm tra URL và gọi đúng phương thức của controller
if ($requestMethod == 'GET') {
    // Lấy sản phẩm trong giỏ hàng
    if (isset($_GET['user_id'])) {
        $userId = $_GET['user_id'];
        $cartItems = $cartController->getCartItems($userId);
        if (empty($cartItems)) {
            echo json_encode([
                'status' => 'success',
                'cart_items' => [],
                'message' => 'Giỏ hàng của bạn đang trống.'
            ]);
        } else {
            echo json_encode([
                'status' => 'success',
                'cart_items' => $cartItems
            ]);
        }
    }
} else if ($requestMethod == 'POST') {
    // Đọc dữ liệu JSON từ body
    $data = json_decode(file_get_contents("php://input"), true);

    // Kiểm tra có tồn tại trường action trong dữ liệu gửi lên không
    if (isset($data['action'])) {
        $action = $data['action'];

        if ($action == 'add_to_cart') {
            // Kiểm tra thông tin yêu cầu thêm sản phẩm vào giỏ hàng
            if (isset($data['user_id']) && isset($data['product_id']) && isset($data['quantity']) && isset($data['color'])) {
                $userId = $data['user_id'];
                $productId = $data['product_id'];
                $quantity = $data['quantity'];
                $color = $data['color'];

                // Thực hiện logic thêm sản phẩm vào giỏ hàng
                $result = $cartController->addToCart($userId, $productId, $quantity, $color);
                if (!$result) {
                    echo json_encode(['status' => 'error', 'message' => 'Có lỗi khi thêm sản phẩm vào giỏ hàng.']);
                } else {
                    echo json_encode(['status' => 'success', 'message' => 'Sản phẩm đã được thêm vào giỏ hàng thành công.']);
                }
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Thiếu thông tin yêu cầu thêm sản phẩm'
                ]);
            }
        } else if ($action == 'update_cart_item') {
            if (isset($data['user_id']) && isset($data['product_id']) && isset($data['quantity']) && isset($data['color'])) {
                $userId = $data['user_id'];
                $productId = $data['product_id'];
                $quantity = $data['quantity'];
                $color = $data['color'];

                // Thực hiện logic thêm sản phẩm vào giỏ hàng
                $result = $cartController->updateToCart($userId, $productId, $quantity, $color);

                if (!$result) {
                    echo json_encode(['status' => 'error', 'message' => 'Có lỗi khi cập nhật sản phẩm trong giỏ hàng.']);
                } else {
                    echo json_encode(['status' => 'success', 'message' => 'Sản phẩm đã được cập nhật trong giỏ hàng thành côngg.']);
                }
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Thiếu thông tin yêu cầu sửa sản phẩm'
                ]);
            }
        } elseif ($action == 'delete_cart_item') {
            // Kiểm tra thông tin yêu cầu xóa sản phẩm khỏi giỏ hàng
            if (isset($data['cart_item_id'])) {
                $cartItemId = $data['cart_item_id'];

                if ($cartItemId) {
                    // Gọi hàm xóa sản phẩm
                    $result = $cartController->deleteCartItem($cartItemId);

                    if ($result) {
                        http_response_code(200);
                        echo json_encode([
                            'status' => 'success',
                            'message' => 'Sản phẩm đã được xóa khỏi giỏ hàng'
                        ]);
                    } else {
                        http_response_code(400);
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Không thể xóa sản phẩm.'
                        ]);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Thiếu thông tin sản phẩm để xóa'
                    ]);
                }
            } else {
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Thiếu thông tin sản phẩm để xóa'
                ]);
            }
        } else {
            // Action không hợp lệ
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Action không hợp lệ'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Thiếu thông tin action trong yêu cầu'
        ]);
    }
} else {
    // Phương thức không hợp lệ
    http_response_code(405);
    echo json_encode(['message' => 'Phương thức không hợp lệ']);
}
