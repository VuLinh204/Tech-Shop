<?php
// api/CartApi.php
require_once '../config/database.php';
require_once '../controllers/CartController.php';
require_once '../config/cors.php';

header("Content-Type: application/json");

$cartController = new CartController();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Phương thức không được hỗ trợ.']);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);
if (!isset($input['cartItemId'])) {
    echo json_encode(['status' => 'error', 'message' => 'Thiếu cartItemId.']);
    exit();
}

$cartItemId = $input['cartItemId'];
$response = $cartController->deleteCartItem($cartItemId);

echo json_encode($response);
