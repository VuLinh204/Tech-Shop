<?php

declare(strict_types=1);

header("Content-Type: application/json");

require_once '../config/cors.php';
require '../config/config.php';
require '../models/UserModel.php';
require '../config/database.php';
require '../controllers/AuthController.php';

$database = new Database();
$userModel = new UserModel(Database::$connection);
$authController = new AuthController($userModel);

$data = json_decode(file_get_contents("php://input"), true);
$response = $authController->login($data);

echo json_encode($response);
