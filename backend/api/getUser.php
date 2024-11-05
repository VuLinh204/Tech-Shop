<?php
session_start();
require_once '../controllers/UserController.php';

if (isset($_SESSION['user'])) {
    echo json_encode(['status' => 'success', 'user' => $_SESSION['user']]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Người dùng chưa đăng nhập.']);
}
