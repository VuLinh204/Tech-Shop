<?php
require_once '../models/UpdateUserModel.php';
require_once '../controllers/UpdateUserController.php';
require_once '../config/cors.php';

// Khởi tạo ProductController
$UserController = new UpdateUserController(new UpdateUserModel());

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lấy dữ liệu từ request
    $data = json_decode(file_get_contents("php://input"), true);

    $userId = $data['user_id'];
    $username = $data['username'];
    $phoneNumber = $data['phone_number'];
    $address = $data['address'];
    $profile_picture = $data['profile_picture'];

    // Xử lý upload file
    // if (isset($_FILES['thumbnail']) && $_FILES['thumbnail']['error'] === 0) {
    //     $targetDir = "../public/uploads/";
    //     $fileName = basename($_FILES['thumbnail']['name']);
    //     $targetFilePath = $targetDir . $fileName;

    //     // Check if file already exists
    //     if (file_exists($targetFilePath)) {
    //         unlink($targetFilePath);
    //     }
    //     if (move_uploaded_file($_FILES['thumbnail']['tmp_name'], $targetFilePath)) {
    //         // File upload thành công, xử lý thêm nếu cần
    //         $data['thumbnail'] = $fileName; // Đường dẫn ảnh đã lưu
    //     } else {
    //         echo json_encode(['status' => 'error', 'message' => 'Không thể lưu ảnh.']);
    //         exit;
    //     }
    // } else {
    //     echo json_encode(['status' => 'error', 'message' => 'File ảnh không hợp lệ.']);
    //     exit;
    // }
    if (isset($action)) {
        $response = $UserController->updateProduct($username, $phoneNumber, $address, $profile_picture, $userId);
        echo $response;
    } else {
        echo json_encode(['error' => 'Thông tin không đầy đủ']);
    }
} else {
    echo json_encode(['error' => 'Phương thức không hợp lệ']);
}
?>