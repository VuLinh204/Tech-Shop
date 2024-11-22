
<?php
session_start();
require_once '../config/database.php';
require_once '../config/cors.php';
require_once '../models/UserModel.php';
require_once '../controllers/AuthController.php';

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];
    $password = $data['password'];

    $database = new Database();
    $userModel = new UserModel(Database::$connection);
    $authController = new AuthController($userModel);
    $response = $authController->createPassword($password);

    echo json_encode($response);
} else {
    echo json_encode(['success' => false, 'errors' => ['Invalid request method.']]);
}
