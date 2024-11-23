<?php
require_once '../models/Product_Model.php';
require_once '../controllers/Product_Controller.php';
require_once '../config/cors.php';

// Khởi tạo ProductController
$productController = new Product_Controller(new Product_Model());

// Lấy phương thức và tham số từ URL
$method = $_SERVER['REQUEST_METHOD'];

function decryptId($encrypted)
{
    $encryptionKey = 'NoLoveNoLife';
    $cipher = 'AES-128-CTR';
    list($encryptedData, $iv) = explode('::', base64_decode($encrypted), 2);
    return openssl_decrypt($encryptedData, $cipher, $encryptionKey, 0, $iv);
}
// Xử lý các loại yêu cầu khác nhau
if ($method === 'GET' && isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'list':
            $productController->getAllProducts();
            break;
        case 'view':
            if (isset($_GET['id'])) {
                $response = $productController->getProductById($_GET['id']);
                echo $response;
            } else {
                echo json_encode(['error' => 'ID sản phẩm không được cung cấp']);
            }
            break;
        case 'search':
            if (isset($_GET['keyword'])) {
                $result = $productController->searchProduct($_GET['keyword']);
                echo $result;
            } else {
                echo json_encode(['error' => 'Từ khóa tìm kiếm không được cung cấp']);
            }
            break;
        default:
            echo json_encode(['error' => 'Hành động không hợp lệ']);
            break;
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Kiểm tra và xử lý các tham số khác
    $id = $_POST['id'] ?? '';
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';
    $category_id = $_POST['category_id'] ?? '';
    $price = $_POST['price'] ?? '';
    $quantity = $_POST['quantity'] ?? '';
    $discount_percent = $_POST['discount_percent'] ?? '';
    $color = $_POST['color'] ?? '';
    $colorArr = explode(",", $color);
    if (!isset($_POST['action']) || empty($_POST['action'])) {
        echo json_encode(['success' => false, 'error' => 'Tham số action không được cung cấp']);
        exit;  // Dừng xử lý khi không có action
    }
    $action = $_POST['action'];
    switch ($action) {
        case 'create':
            //giải mã id category
            $categoryId = decryptId($category_id);
            // Xử lý upload file
            if (isset($_FILES['thumbnail']) && $_FILES['thumbnail']['error'] === 0) {
                $targetDir = "../public/uploads/";
                $fileName = basename($_FILES['thumbnail']['name']);
                $targetFilePath = $targetDir . $fileName;

                if (move_uploaded_file($_FILES['thumbnail']['tmp_name'], $targetFilePath)) {
                    // File upload thành công, xử lý thêm nếu cần
                    $data['thumbnail'] = $fileName; // Đường dẫn ảnh đã lưu
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Không thể lưu ảnh.']);
                    exit;
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'File ảnh không hợp lệ.']);
                exit;
            }
            if (isset($action)) {
                $response = $productController->createProduct([
                    'name' => $name,
                    'description' => $description,
                    'category_id' => $categoryId,
                    'price' => $price,
                    'quantity' => $quantity,
                    'discount_percent' => $discount_percent,
                    'color' => $colorArr,
                    'thumbnail' => $data['thumbnail'] ?? null,
                ]);
                echo $response;
            } else {
                echo json_encode(['error' => 'Thông tin sản phẩm không đầy đủ']);
            }
            break;
        case 'update':
            // Xử lý cả tạo mới và cập nhật dựa vào 'action' trong dữ liệu gửi lên
            $data = $_POST;
            $action = $data['action'] ?? '';
            $thumbnail = $_FILES['thumbnail'] ?? null;

            // Thư mục lưu ảnh
            $uploads_dir = '../public/uploads';

            if ($action === 'update') {
                $currentThumbnail = $data['current_thumbnail'] ?? null;  // Đảm bảo có trường này khi gửi yêu cầu
                if (isset($thumbnail) && $thumbnail['error'] === UPLOAD_ERR_OK) {
                    // Xử lý khi người dùng tải lên ảnh mới
                    $thumbnailFileName = basename($thumbnail['name']);

                    // Di chuyển file tải lên
                    if (move_uploaded_file($thumbnail['tmp_name'], "$uploads_dir/$thumbnailFileName")) {
                        // Nếu tải ảnh mới, cập nhật ảnh mới
                        $response = $productController->updateProduct(new Product($id, $name, $price, $description, $colorArr, $quantity, $thumbnailFileName, $discount_percent, $category_id));
                        echo $response;
                    } else {
                        echo json_encode(["error" => "Failed to move uploaded file."]);
                    }
                } else {
                    // Nếu không có ảnh mới, sử dụng lại ảnh cũ
                    if ($currentThumbnail) {
                        $response = $productController->updateProduct(new Product($id, $name, $price, $description, $colorArr, $quantity, $currentThumbnail, $discount_percent, $category_id));
                        echo $response;
                    } else {
                        echo json_encode(["error" => "No valid thumbnail or current thumbnail not provided."]);
                    }
                }
            } else {
                echo json_encode(["success" => false, "message" => "Invalid input data for update."]);
            }
            break;
        case 'delete':
            $id = $_POST['id'];
            if (isset($id)) {
                $response = $productController->deleteProduct($id);
                echo $response;
            } else {
                echo json_encode(['error' => 'ID sản phẩm không được cung cấp']);
            }
            break;
        default:
            echo json_encode(['error' => 'Hành động không hợpp lệ']);
            break;
    }
} else {
    echo json_encode(['error' => 'Phương thức không hợp lệ']);
}