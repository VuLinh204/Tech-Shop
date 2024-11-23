<?php
require_once '../config/database.php';
require_once '../config/cors.php';
require_once '../models/BannerModel.php';
require_once '../controllers/BannerController.php';

// Kết nối database
$connection = Database::getConnection();
if (!$connection) {
    http_response_code(500);
    echo json_encode(['message' => 'Database connection failed']);
    exit;
}

$bannerController = new BannerController(new BannerModel());

// Xử lý yêu cầu
$method = $_SERVER['REQUEST_METHOD'];

$data = json_decode(file_get_contents("php://input"), true);
switch ($method) {
    case 'GET':
            $bannerController->getBanners();

        break;

    case 'POST':
        $action = $data['action'];
        if ($data['action'] === 'add') {
            // Lấy dữ liệu từ $_POST
            $title = $data['title'];
            $link = $data['link'];

            // Kiểm tra trường hợp thiếu dữ liệu bắt buộc
            if (!$title || !$link) {
                http_response_code(400);
                echo json_encode(['message' => 'Missing required fields']);
                exit;
            }

            // Xử lý file upload (nếu có)
            // $image_url = '../public/uploads/'. $data['image_url'];
            $image_url = $data['image_url'];
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $upload_dir = __DIR__ . '../public/uploads/';
                $image_url = '/uploads/' . basename($_FILES['image']['name']);
                move_uploaded_file($_FILES['image']['tmp_name'], $upload_dir . basename($_FILES['image']['name']));
            }

            // Gọi phương thức addBanner của Controller
            $bannerController->addBanner([
                'title' => $title,
                'link' => $link,
                'image_url' => $image_url,
            ]);
        } else if ($data['action'] === 'update') {
            $id = $data['id'];
            $title = $data['title'];
            $link = $data['link'];

            // Kiểm tra các trường bắt buộc
            if (!$id || !$title || !$link) {
                http_response_code(400);
                echo json_encode(['message' => 'Missing required fields']);
                exit;
            }

            // Xử lý upload file nếu có
            $image_url = $data['image_url'];
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $image_url = '/uploads/' . basename($_FILES['image']['name']);
                move_uploaded_file($_FILES['image']['tmp_name'], __DIR__ . $image_url);
            }

            // Gọi Controller để cập nhật banner
            $bannerController->updateBanner([
                'id' => $id,
                'title' => $title,
                'link' => $link,
                'image_url' => $image_url,
            ]);
        } else if ($data['action'] === 'delete') {
            if (isset($data['id'])) {
                $id = $data['id'];
                
                $bannerController->deleteBanner($id);
            } else {
                // Nếu không có ID, trả về mã lỗi 400
                http_response_code(400);
                echo json_encode(['message' => 'ID is required']);
            }
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method not allowed']);
        break;
}
