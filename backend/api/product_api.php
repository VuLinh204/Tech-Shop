<?php
require_once '../models/Product_Model.php';
require_once '../controllers/Product_Controller.php';
require_once '../config/cors.php';

// Khởi tạo ProductController
$productController = new Product_Controller(new Product_Model());

// Lấy phương thức và tham số từ URL
$method = $_SERVER['REQUEST_METHOD'];

// Xử lý các loại yêu cầu khác nhau
if ($method === 'GET' && isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'list':
            $productController->getAllProducts();
            break;
        case 'view':
            if (isset($_GET['id'])) {
                $response = $productController->getProductById($_GET['id']);
                echo $response;
            } else {
                echo json_encode(['error' => 'ID sản phẩm không được cung cấp']);
            }
            break;
        case 'search':
            if (isset($_GET['keyword'])) {
                $productController->searchProduct($_GET['keyword']);
            } else {
                echo json_encode(['error' => 'Từ khóa tìm kiếm không được cung cấp']);
            }
            break;
        default:
            echo json_encode(['error' => 'Hành động không hợp lệ']);
            break;
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['action']) || empty($data['action'])) {
        echo json_encode(['success' => false, 'error' => 'Tham số action không được cung cấp']);
        exit;  // Dừng xử lý khi không có action
    }
    $action = $data['action'];
    switch ($action) {
        case 'create':
            if (isset($data['name'], $data['description'], $data['category_id'], $data['price'], $data['quantity'], $data['discount_percent'], $data['thumbnail'], $data['color'])) {
                $response = $productController->createProduct($data);
                echo $response;
            } else {
                echo json_encode(['error' => 'Thông tin sản phẩm không đầy đủ']);
            }
            break;
        case 'update':
            $product = (object) $data;
            if (isset($data['name'], $data['description'], $data['category_id'], $data['price'], $data['quantity'], $data['discount_percent'], $data['thumbnail'], $data['color'])) {
                $response = $productController->updateProduct($product);
                echo $response;
            } else {
                echo json_encode(['error' => 'Thông tin sản phẩm không đầy đủ']);
            }
            break;
        case 'delete':
            if (isset($data['id'])) {
                $response = $productController->deleteProduct($data['id']);
                echo $response;
            } else {
                echo json_encode(['error' => 'ID sản phẩm không được cung cấp']);
            }
            break;
        default:
            echo json_encode(['error' => 'Hành động không hợpp lệ']);
            break;
    }
} else {
    echo json_encode(['error' => 'Phương thức không hợp lệ']);
}
