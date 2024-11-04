<?php
require_once '../controllers/CategoriesController.php';
require_once '../config/cors.php';

// Khởi tạo controller
$categoryController = new CategoryController();

// Xác định phương thức HTTP
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Lấy tất cả danh mục
        $categories = $categoryController->getAllCategories();
        header('Content-Type: application/json');
        echo json_encode($categories);
        break;

    case 'POST':
        // Tạo danh mục
        $data = $_POST; // Lấy dữ liệu từ POST
        $thumbnail = $_FILES['thumbnail'] ?? null;

        if (!isset($data['name']) || !$thumbnail || $thumbnail['error'] !== UPLOAD_ERR_OK) {
            echo json_encode(["error" => "Invalid input data."]);
            exit;
        }

        $name = $data['name'];
        $thumbnailFileName = basename($thumbnail['name']);
        $uploads_dir = '../public/uploads'; // Đường dẫn lưu ảnh

        // Kiểm tra định dạng file
        $fileType = pathinfo($thumbnailFileName, PATHINFO_EXTENSION);
        if ($fileType != "jpg" && $fileType != "png") {
            echo json_encode(["error" => "Only JPG and PNG files are allowed."]);
            exit;
        }

        // Di chuyển file tải lên
        if (move_uploaded_file($thumbnail['tmp_name'], "$uploads_dir/$thumbnailFileName")) {
            $result = $categoryController->createCategory($name, $thumbnailFileName);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["error" => "Failed to move uploaded file."]);
        }
        break;

    case 'PUT':
        // Cập nhật danh mục
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? null;
        $name = $data['name'] ?? null;
        $thumbnail = $data['thumbnail'] ?? null;

        if ($id && $name && $thumbnail) {
            $result = $categoryController->updateCategory($id, $name, $thumbnail);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid input data."]);
        }
        break;

    case 'DELETE':
        // Xóa danh mục
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? null;

        if ($id) {
            $result = $categoryController->deleteCategory($id);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid ID."]);
        }
        break;

    default:
        echo json_encode(["error" => "Method not allowed."]);
        break;
}
