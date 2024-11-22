<?php
// Include necessary files
require_once '../controllers/Product_Controller.php';
require_once '../models/Product_Model.php';
require_once '../config/cors.php';

// Get the search query from the request
if (isset($_GET['query'])) {
    $searchKey = $_GET['query'];

    // Initialize the ProductModel and ProductController
    $productModel = new Product_Model();
    $productController = new Product_Controller($productModel);

    // Call the searchProduct method in ProductController
    $productController->searchProduct($searchKey);
} else {
    echo json_encode(["status" => "error", "message" => "Search query is required"]);
}
