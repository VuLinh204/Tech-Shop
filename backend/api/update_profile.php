<?php
include_once '../config/database.php'; // Import file kết nối cơ sở dữ liệu
require_once '../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lấy dữ liệu từ request
    $data = json_decode(file_get_contents("php://input"), true);

    $userId = $data['user_id'];
    $username = $data['username'];
    $phoneNumber = $data['phone_number'];
    $address = $data['address'];

    // Kiểm tra kết nối cơ sở dữ liệu
    $database = new Database();
    $conn = $database::$connection;

    // Thực hiện câu lệnh SQL để cập nhật thông tin người dùng
    $query = "UPDATE user SET username = ?, phone_number = ?, address = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssi", $username, $phoneNumber, $address, $userId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Cập nhật thông tin thành công"]);
    } else {
        echo json_encode(["success" => false, "message" => "Cập nhật thất bại"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Yêu cầu không hợp lệ"]);
}
?>
