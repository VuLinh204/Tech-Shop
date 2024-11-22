<?php
include_once '../config/database.php'; // Import file kết nối cơ sở dữ liệu
require_once '../config/cors.php';

$database = new Database();
$conn = $database::$connection;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Lấy dữ liệu từ request
    $userId = $_POST['user_id'];
    $username = $_POST['username'];
    $phoneNumber = $_POST['phone_number'];
    $address = $_POST['address'];

    // Biến để lưu đường dẫn ảnh
    $avatar = '';

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
            // File upload thành công, lưu tên file mới
            $avatar = $fileName;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Không thể lưu ảnh.']);
            exit;
        }
    } else {
        // Nếu không có ảnh mới, giữ lại ảnh cũ
        // Cần lấy thông tin ảnh cũ từ cơ sở dữ liệu


        $query = "SELECT avatar FROM user WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $avatar = $row['avatar'];  // Lấy ảnh cũ từ cơ sở dữ liệu
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Không tìm thấy người dùng.']);
            exit;
        }
    }

    // Kiểm tra kết nối cơ sở dữ liệu
    $query = "UPDATE user SET username = ?, phone_number = ?, address = ?, avatar = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    if ($stmt) {
        $stmt->bind_param("ssssi", $username, $phoneNumber, $address, $avatar, $userId);
        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Thông tin người dùng đã được cập nhật thành công",
                "data" => [
                    "avatar" => $avatar,
                    "username" => $username,
                    "phone_number" => $phoneNumber,
                    "address" => $address,
                ]
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Cập nhật thất bại: " . $stmt->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Lỗi khi chuẩn bị câu truy vấn: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Yêu cầu không hợp lệ"]);
}
?>