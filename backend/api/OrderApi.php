<?php
require_once '../controllers/OrderController.php';
include_once '../config/cors.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_GET['user_id'] ?? null;

    if (!$userId || !is_numeric($userId)) {
        echo json_encode([
            'success' => false,
            'message' => 'ID người dùng không hợp lệ.'
        ]);
        exit;
    }

    $orderController = new OrderController();
    $orders = $orderController->getOrdersByUserId((int)$userId);

    echo json_encode([
        'success' => true,
        'orders' => $orders
    ]);
    exit;
}

echo json_encode([
    'success' => false,
    'message' => 'Phương thức không được hỗ trợ.'
]);
exit;
