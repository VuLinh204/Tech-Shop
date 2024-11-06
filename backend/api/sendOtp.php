<?php
require_once '../config/database.php';
require_once '../config/cors.php';
require_once '../helpers/emailHelper.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];
    $otp = rand(100000, 999999);

    // Lưu OTP vào cơ sở dữ liệu
    $stmt = $pdo->prepare("INSERT INTO otp_codes (email, otp) VALUES (?, ?)");
    $stmt->execute([$email, $otp]);

    // Gửi OTP qua email
    if (sendOtpEmail($email, "OTP Đăng Ký", "Mã OTP của bạn là: $otp")) {
        echo json_encode(['success' => true, 'message' => 'OTP đã được gửi!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gửi OTP thất bại']);
    }
}
