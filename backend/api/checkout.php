<?php
require_once '../controllers/OrderController.php';
require_once '../config/cors.php';

// Đặt header JSON
header('Content-Type: application/json');

// Status = 1 -> Đang xử lý (Chưa Thanh Toán) | 2 -> Đã thanh toán | 3 -> Đã giao hàng | 4 -> Đã hủy

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lấy dữ liệu từ body request
    $data = json_decode(file_get_contents('php://input'), true);

    // Kiểm tra dữ liệu
    if (!isset($data['user_id'], $data['status'], $data['items'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Dữ liệu không hợp lệ! Vui lòng cung cấp đầy đủ thông tin user_id, status và items.'
        ]);
        exit;
    }

    // Kiểm tra các trường trong 'items' có hợp lệ không
    $validStatuses = [1, 2, 3, 4];
    if (!in_array($data['status'], $validStatuses)) {
        echo json_encode([
            'success' => false,
            'message' => 'Trạng thái đơn hàng không hợp lệ!'
        ]);
        exit;
    }
    if (!is_array($data['items']) || empty($data['items'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Giỏ hàng không hợp lệ! Vui lòng kiểm tra lại.'
        ]);
        exit;
    }

    // Kiểm tra từng sản phẩm trong 'items'
    foreach ($data['items'] as $item) {
        if (!isset($item['product_id'], $item['quantity'], $item['price'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Sản phẩm trong giỏ hàng không hợp lệ! Vui lòng kiểm tra lại.'
            ]);
            exit;
        }

        // Kiểm tra quantity và price hợp lệ
        if (!is_numeric($item['quantity']) || $item['quantity'] <= 0) {
            echo json_encode([
                'success' => false,
                'message' => 'Số lượng sản phẩm không hợp lệ!'
            ]);
            exit;
        }

        if (!is_numeric($item['price']) || $item['price'] <= 0) {
            echo json_encode([
                'success' => false,
                'message' => 'Giá sản phẩm không hợp lệ!'
            ]);
            exit;
        }
    }

    // Kiểm tra user_id có phải là một số hợp lệ không
    if (!is_numeric($data['user_id']) || $data['user_id'] <= 0) {
        echo json_encode([
            'success' => false,
            'message' => 'ID người dùng không hợp lệ!'
        ]);
        exit;
    }

    $orderController = new OrderController();
    $response = $orderController->createFullOrder($data);

    if ($response['success']) {
        echo json_encode([
            'success' => true,
            'message' => 'Thanh toán thành công!'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => $response['message'] ?? 'Có lỗi xảy ra trong quá trình thanh toán.'
        ]);
    }
    exit;
}

echo json_encode([
    'success' => false,
    'message' => 'Chỉ hỗ trợ phương thức POST!'
]);
exit;
