<?php
require_once '../controllers/CategoriesController.php';
require_once '../config/cors.php';

// Khởi tạo controller
$categoryController = new CategoryController();
function encryptId($id)
{
    $encryptionKey = 'NoLoveNoLife'; // Khóa bí mật
    $cipher = 'AES-128-CTR'; // Thuật toán mã hóa
    $options = 0;
    $iv = random_bytes(openssl_cipher_iv_length($cipher)); // Tạo IV ngẫu nhiên
    $encryptedId = openssl_encrypt($id, $cipher, $encryptionKey, $options, $iv);
    return base64_encode($encryptedId . '::' . $iv); // Ghép mã hóa và IV
}

function decryptId($encrypted)
{
    $encryptionKey = 'NoLoveNoLife';
    $cipher = 'AES-128-CTR';
    list($encryptedData, $iv) = explode('::', base64_decode($encrypted), 2);
    return openssl_decrypt($encryptedData, $cipher, $encryptionKey, 0, $iv);
}

// Xác định phương thức HTTP
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Lấy tất cả danh mục
        $categories = $categoryController->getAllCategories();
        foreach ($categories as &$category) {
            $originalId = $category['id']; // ID gốc
            $category['id'] = encryptId($originalId); // Mã hóa ID
            $category['original_id'] = $originalId; // Lưu lại ID gốc
        }
        header('Content-Type: application/json');
        echo json_encode($categories);
        break;

    case 'POST':
        // Xử lý cả tạo mới và cập nhật dựa vào 'action' trong dữ liệu gửi lên
        $data = $_POST;
        $action = $data['action'] ?? '';
        $thumbnail = $_FILES['thumbnail'] ?? null;

        // Thư mục lưu ảnh
        $uploads_dir = '../public/uploads';

        if ($action === 'update') {

            // Yêu cầu cập nhật danh mục
            $id = decryptId($data['id']); // Giải mã ID
            $name = $data['name'] ?? null;
            $currentThumbnail = $data['current_thumbnail'] ?? null;  // Đảm bảo có trường này khi gửi yêu cầu

            if ($id && $name) {
                if ($thumbnail && $thumbnail['error'] === UPLOAD_ERR_OK) {
                    // Xử lý khi người dùng tải lên ảnh mới
                    $thumbnailFileName = basename($thumbnail['name']);

                    // Di chuyển file tải lên
                    if (move_uploaded_file($thumbnail['tmp_name'], "$uploads_dir/$thumbnailFileName")) {
                        // Nếu tải ảnh mới, cập nhật ảnh mới
                        $result = $categoryController->updateCategory($id, $name, $thumbnailFileName);
                        echo json_encode(["success" => $result]);
                    } else {
                        echo json_encode(["error" => "Failed to move uploaded file."]);
                    }
                } else {
                    // Nếu không có ảnh mới, sử dụng lại ảnh cũ
                    if ($currentThumbnail) {
                        $result = $categoryController->updateCategory($id, $name, $currentThumbnail);
                        echo json_encode(["success" => $result]);
                    } else {
                        echo json_encode(["error" => "No valid thumbnail or current thumbnail not provided."]);
                    }
                }
            } else {
                echo json_encode(["success" => false, "message" => "Invalid input data for update."]);
            }
        } else {
            // Yêu cầu tạo mới danh mục
            if (!isset($data['name']) || !$thumbnail || $thumbnail['error'] !== UPLOAD_ERR_OK) {
                echo json_encode(["error" => "Invalid input data."]);
                exit;
            }

            $name = $data['name'];
            $thumbnailFileName = basename($thumbnail['name']);

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
        }
        break;

    case 'DELETE':
        // Xóa danh mục
        $data = json_decode(file_get_contents("php://input"), true);
        $id = decryptId($data['id']); // Giải mã ID

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
