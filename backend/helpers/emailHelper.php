<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';
require_once '../models/UserModel.php';

function sendOtpEmail($email, $otp)
{

    $mail = new PHPMailer(true);

    // Kiểm tra định dạng email hợp lệ
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['success' => false, 'errors' => ['Địa chỉ email không hợp lệ.']];
    }

    // $userModel = new UserModel(Database::$connection);

    // if ($userModel->emailExists($email)) {
    //     return [
    //         'success' => false,
    //         'errors' => ['Email này đã được đăng ký. Vui lòng đăng nhập hoặc thử dùng email khác.']
    //     ];
    // }

    // Kiểm tra bản ghi MX
    $domain = substr(strrchr($email, "@"), 1);
    if (!checkdnsrr($domain, "MX")) {
        return ['success' => false, 'errors' => ['Tên miền không hợp lệ hoặc không hỗ trợ nhận email.']];
    }

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'linhlg2004@gmail.com';
        $mail->Password = 'govs jsyc vpkh gtli';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('linhlg2004@gmail.com', 'Tech Shop');
        $mail->addAddress($email);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Your OTP Code';
        $mail->Body    = "Your OTP code is: <strong>$otp</strong>. It expires in 5 minutes.";
        $mail->AltBody = "Your OTP code is: $otp. It expires in 5 minutes.";

        if ($mail->send()) {
            return ['success' => true, 'message' => 'OTP đã được gửii!'];
        } else {
            return ['success' => false, 'errors' => ['Gửi OTP thất bại.']];
        }
    } catch (Exception $e) {
        return ['success' => false, 'errors' => ['Gửi OTP thất bại: ' . $mail->ErrorInfo]];
    }
}
