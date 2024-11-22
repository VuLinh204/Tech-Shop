<?php
session_start();
require_once '../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];
    $otp = $data['otp'];

    // Kiểm tra OTP có tồn tại và trùng với OTP trong session
    if ($_SESSION['otp_email'] === $email && $_SESSION['otp'] == $otp) {
        echo json_encode(['success' => true, 'message' => 'OTP hợp lệ, vui lòng nhập mật khẩu để tiếp tục.']);
    } else {
        echo json_encode(['success' => false, 'errors' => ['OTP không hợp lệ!']]);
    }
}
