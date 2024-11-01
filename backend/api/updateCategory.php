<?php
require_once '../controllers/CategoriesController.php';
require_once '../config/cors.php';
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$name = $data['name'];
$thumbnail = $data['thumbnail'];

$categoryController = new CategoryController();
$result = $categoryController->updateCategory($id, $name, $thumbnail);

echo json_encode(["success" => $result]);
