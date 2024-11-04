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
        // Lấy danh sách tất cả màu sắc
        $colors = $colorController->getAllColors();
        echo json_encode($colors);
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Phương thức không được hỗ trợ']);
        break;
}
