<?php
include_once '../config/database.php'; // Import file kết nối cơ sở dữ liệu
require_once '../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lấy dữ liệu từ request
    // $data = json_decode(file_get_contents("php://input"), true);

    $userId = $_POST['user_id'];
    $username = $_POST['username'];
    $phoneNumber = $_POST['phone_number'];
    $address = $_POST['address'];

    // Xử lý upload file
    if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === 0) {
        $targetDir = "../public/uploads/";
        $fileName = uniqid() . "_" . basename($_FILES['avatar']['name']);
        $targetFilePath = $targetDir . $fileName;

        // Check if file already exists
        if (file_exists($targetFilePath)) {
            unlink($targetFilePath);
        }
        if (move_uploaded_file($_FILES['avatar']['tmp_name'], $targetFilePath)) {
            // File upload thành công, xử lý thêm nếu cần
            $data['avatar'] = $fileName; // Đường dẫn ảnh đã lưu
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Không thể lưu ảnh.']);
            exit;
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'File ảnh không hợp lệ.']);
        exit;
    }

    // Kiểm tra kết nối cơ sở dữ liệu
    $database = new Database();
    $conn = $database::$connection;

    // Thực hiện câu lệnh SQL để cập nhật thông tin người dùng
    $query = "UPDATE user SET username = ?, phone_number = ?, address = ?, avatar = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    if ($stmt = $conn->prepare($query)) {
        $avatar = $data['avatar'];
        $stmt->bind_param("ssssi", $username, $phoneNumber, $address, $avatar, $userId);
        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Thông tin người dùng đã được cập nhật thành công",
                "data" => [
                    "avatar" => $fileName,
                    "username" => $username,
                    "phone_number" => $phoneNumber,
                    "address" => $address,
                ]
            ]);
        } else {
            // Thông báo lỗi rõ ràng nếu việc cập nhật thất bại
            return json_encode(["status" => "error", "message" => "Cập nhật thất bại: " . $stmt->error]);
        }
    } else {
        // Thông báo lỗi khi không thể chuẩn bị câu truy vấn
        return json_encode(["status" => "error", "message" => "Lỗi khi chuẩn bị câu truy vấn: " . self::$connection->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Yêu cầu không hợp lệ"]);
}
?>