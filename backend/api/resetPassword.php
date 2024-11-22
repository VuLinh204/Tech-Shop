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
    $password = $data['newPassword'];

    if (!isset($data['email']) || !isset($data['newPassword'])) {
        echo json_encode([
            'success' => false,
            'errors' => ['Lỗi email hoặc mật khẩu sai...']
        ]);
        return;
    }

    $database = new Database();
    $userModel = new UserModel(Database::$connection);
    $authController = new AuthController($userModel);

    $user = $userModel->findByEmail($email);

    if ($user) {
        $response = $authController->updatePassword($email, $password);
        echo json_encode($response);
    } else {
        echo json_encode(['success' => false, 'errors' => ['Email not found.']]);
    }
} else {
    echo json_encode(['success' => false, 'errors' => ['Invalid request method.']]);
}
