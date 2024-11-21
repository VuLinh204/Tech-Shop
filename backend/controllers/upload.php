<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['thumbnail'])) {
        $targetDir = "../public/uploads/";  // Thư mục lưu trữ ảnh
        $fileName = basename($_FILES['thumbnail']['name']);
        $targetFilePath = $targetDir . $fileName;

        // Kiểm tra kiểu file
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
        if (in_array($fileType, ['jpg', 'png', 'jpeg'])) {
            // Lưu file vào thư mục
            if (move_uploaded_file($_FILES['thumbnail']['tmp_name'], $targetFilePath)) {
                // Trả về URL của ảnh đã lưu
                $response = [
                    'status' => 'success',
                    'image_url' => $targetFilePath,
                ];
                echo json_encode($response);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Không thể lưu ảnh.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Chỉ hỗ trợ định dạng JPG, JPEG, PNG.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Không có file ảnh nào được gửi lên.']);
    }
}
?>