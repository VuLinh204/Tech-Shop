<?php
session_start();
require_once '../config/cors.php';
include '../config/database.php';

$database = new Database();
$conn = $database::$connection;

$data = json_decode(file_get_contents("php://input"));
$oldPassword = $data->oldPassword ?? '';
$newPassword = $data->newPassword ?? '';
$user_id = $data->id ?? '';
$_SESSION['user_id'] = $user_id;  // Lưu user_id vào session

// Kiểm tra xem người dùng đã đăng nhập hay chưa
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Bạn chưa đăng nhập.']);
    exit;
}

if (empty($oldPassword) || empty($newPassword)) {
    echo json_encode(['status' => 'error', 'message' => 'Vui lòng nhập đầy đủ thông tin.']);
    exit;
}

// Truy vấn mật khẩu hiện tại của người dùng từ cơ sở dữ liệu
$userId = $_SESSION['user_id'];
$stmt = $conn->prepare("SELECT password FROM user WHERE id = ?");
$stmt->execute([$userId]);
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Kiểm tra nếu không tìm thấy người dùng hoặc mật khẩu cũ không đúng
if (!$userId || !password_verify($oldPassword, $user['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Nhập sai password']);
    exit;
}

// Mã hóa mật khẩu mới và cập nhật vào cơ sở dữ liệu
$hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

$stmt = $conn->prepare("UPDATE user SET password = ? WHERE id = ?");
if ($stmt->execute([$hashedNewPassword, $userId])) {
    // Lưu thông tin log nếu cần (bỏ phần log nếu không cần thiết)
    // $logStmt = $conn->prepare("INSERT INTO logs (user_id, action, timestamp) VALUES (?, 'change_password', NOW())");
    // $logStmt->execute([$userId]);
    echo json_encode(['status' => 'success', 'message' => 'Đổi mật khẩu thành công.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Có lỗi xảy ra khi cập nhật mật khẩu.']);
}
