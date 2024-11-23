<?php
// clear_cart.php
include_once '../config/database.php';
include_once '../config/cors.php';

$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id;

$connection = Database::getConnection();

$stmt = $connection->prepare("DELETE FROM cart WHERE user_id = ?");

if (!$stmt) {
    die('Lỗi chuẩn bị truy vấn: ' . $connection->error);
}

$stmt->bind_param("i", $user_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Cart cleared successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to clear cart']);
}

$stmt->close();
