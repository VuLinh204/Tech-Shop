<?php
include_once('../controllers/CategoriesController.php');
require_once '../config/cors.php';
$categoryController = new CategoryController();
$categories = $categoryController->getAllCategories();

header('Content-Type: application/json');

echo json_encode($categories);
