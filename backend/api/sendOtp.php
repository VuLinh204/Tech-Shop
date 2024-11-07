<?php
session_start();
require_once '../config/cors.php';
require_once '../helpers/emailHelper.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];
    $otp = rand(100000, 999999);

    // Lưu OTP vào session
    $_SESSION['otp'] = $otp;
    $_SESSION['otp_email'] = $email;

    $result = sendOtpEmail($email, $otp);

    echo json_encode($result);
}
