<?php
header("Content-Type: application/json");
require '../config/cors.php';

class LogoutController
{
    public function logout()
    {
        // Xóa thông tin người dùng khỏi session
        if (isset($_SESSION['user'])) {
            unset($_SESSION['user']);  // Xóa thông tin người dùng
        }

        // Nếu bạn cũng muốn xóa ID người dùng
        if (isset($_SESSION['id'])) {
            unset($_SESSION['id']);  // Xóa ID người dùng
        }

        // Hủy session
        session_destroy();

        // Phản hồi kết quả thành công
        echo json_encode([
            'status' => 'success',
            'message' => 'Đăng xuất thành công.'
        ]);
    }
}
