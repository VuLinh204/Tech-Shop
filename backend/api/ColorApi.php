<?php
require_once '../config/database.php';
require_once '../controllers/ColorController.php';
require_once '../config/cors.php';
header('Content-Type: application/json');

// Xác định phương thức HTTP
$method = $_SERVER['REQUEST_METHOD'];
$colorController = new ColorController();

switch ($method) {
    case 'GET':
        // Kiểm tra xem có truyền product_id qua query string không
        if (isset($_GET['product_id']) && !empty($_GET['product_id'])) {
            // Lấy product_id từ query string
            $product_id = $_GET['product_id'];

            // Lấy danh sách màu sắc cho product_id
            $response = $colorController->getAllColors($product_id);

            // Kiểm tra kết quả và trả về phản hồi thích hợp
            if ($response['status'] === 'success') {
                echo json_encode([
                    'status' => 'success',
                    'data' => $response['data']
                ]);
            } else {
                http_response_code(404); // Nếu không có màu sắc, trả về lỗi 404
                echo json_encode([
                    'status' => 'error',
                    'message' => $response['message']
                ]);
            }
        } else {
            // Nếu không có product_id, trả về lỗi 400
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Product ID is required.'
            ]);
        }
        break;

    default:
        // Nếu phương thức không phải GET
        http_response_code(405); // Method Not Allowed
        echo json_encode([
            'status' => 'error',
            'message' => 'Method Not Allowed'
        ]);
        break;
}
