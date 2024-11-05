<?php
session_start();
include '../config/database.php';

// Kiểm tra nếu người dùng đã đăng nhập
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Bạn chưa đăng nhập.']);
    exit;
}

// Lấy dữ liệu từ yêu cầu POST
$data = json_decode(file_get_contents("php://input"));
$oldPassword = $data->oldPassword;
$newPassword = $data->newPassword;
$email = $_SESSION['email']; // Email người dùng từ phiên

// Truy vấn lấy thông tin người dùng từ cơ sở dữ liệu
$stmt = $pdo->prepare("SELECT password FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Kiểm tra mật khẩu cũ
if (!password_verify($oldPassword, $user['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Mật khẩu hiện tại không đúng.']);
    exit;
}

// Mã hóa mật khẩu mới
$hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

// Cập nhật mật khẩu mới trong cơ sở dữ liệu
$stmt = $pdo->prepare("UPDATE users SET password = ? WHERE email = ?");
if ($stmt->execute([$hashedNewPassword, $email])) {
    echo json_encode(['status' => 'success', 'message' => 'Đổi mật khẩu thành công.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Có lỗi xảy ra khi cập nhật mật khẩu.']);
}
