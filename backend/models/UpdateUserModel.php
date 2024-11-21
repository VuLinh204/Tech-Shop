<?php
require_once '../config/database.php';
class UpdateUserModel extends Database
{
    public function updateProduct($username, $phoneNumber, $address, $profile_picture, $userId)
    {
        $query = "UPDATE user SET username = ?, phone_number = ?, address = ?, profile_picture = ? WHERE id = ?";
        $stmt = self::$connection->prepare($query);
        if ($stmt = self::$connection->prepare($query)) {
            $stmt->bind_param("ssssi", $username, $phoneNumber, $address, $profile_picture, $userId);
            if ($stmt->execute()) {
                return ["status" => "success", "message" => "Đã được cập nhật thông tin người dùng thành công"];
            } else {
                // Thông báo lỗi rõ ràng nếu việc cập nhật thất bại
                return ["status" => "error", "message" => "Cập nhật thất bại: " . $stmt->error];
            }
        } else {
            // Thông báo lỗi khi không thể chuẩn bị câu truy vấn
            return ["status" => "error", "message" => "Lỗi khi chuẩn bị câu truy vấn: " . self::$connection->error];
        }
    }
}
?>