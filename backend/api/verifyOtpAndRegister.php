<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $name = $data['name'];
    $otp = $data['otp'];

    // Kiểm tra OTP
    $stmt = $pdo->prepare("SELECT * FROM otp_codes WHERE email = ? AND otp = ?");
    $stmt->execute([$email, $otp]);
    $otpEntry = $stmt->fetch();

    if ($otpEntry) {
        // Xoá OTP sau khi xác thực thành công
        $stmt = $pdo->prepare("DELETE FROM otp_codes WHERE email = ?");
        $stmt->execute([$email]);

        // Đăng ký người dùng mới
        $stmt = $pdo->prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)");
        if ($stmt->execute([$email, $password, $name])) {
            echo json_encode(['success' => true, 'message' => 'Đăng ký thành công']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Đăng ký thất bại']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'OTP không hợp lệ']);
    }
}
