<?php
require_once '../controllers/CategoriesController.php';
require_once '../config/cors.php';
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'], $data['thumbnail'])) {
    echo json_encode(["error" => "Invalid input data."]);
    exit;
}

$name = $data['name'];
$thumbnail = $data['thumbnail'];

$categoryController = new CategoryController();
$result = $categoryController->createCategory($name, $thumbnail);

if ($result) {
    echo json_encode(["success" => true]);
} else {
    error_log("Failed to create category for name: $name, thumbnail: $thumbnail"); // Ghi log lỗi
    echo json_encode(["error" => "Failed to create category."]);
}
