<?php
require_once '../controllers/CategoriesController.php';
require_once '../config/cors.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;

    if ($id) {
        $categoryController = new CategoryController();
        $result = $categoryController->deleteCategory($id);
        echo json_encode(["success" => $result]);
    } else {
        echo json_encode(["success" => false, "message" => "ID không hợp lệ"]);
    }
}
