
<?php

require_once '../models/FeedbackModel.php';
require_once '../controllers/FeedbackController.php';
require_once '../config/cors.php';

$db = new PDO("mysql:host=localhost;port=3306;dbname=database_tech_store", "root", "");
$feedbackModel = new FeedbackModel($db);
$feedbackController = new FeedbackController($feedbackModel);

header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Lấy danh sách feedback theo product_id
        $productId = $_GET['product_id'] ?? null;
        if ($productId) {
            $feedback = $feedbackController->getFeedback($productId);
            echo json_encode($feedback);
        } else {
            echo json_encode(["error" => "Product ID is required"]);
        }
        break;

    case 'POST':
        // Thêm feedback mới hoặc cập nhật nếu đã tồn tại
        $data = json_decode(file_get_contents('php://input'), true);
        $userId = $data['user_id'] ?? null;
        $productId = $data['product_id'] ?? null;
        $comment = $data['body'] ?? '';
        $rating = $data['rating'] ?? 5;
        $parentId = $data['parent_id'] ?? null; // Nhận thêm parent_id từ client

        if ($userId && $productId && $comment) {
            $result = $feedbackModel->addFeedback($userId, $productId, $comment, $rating, $parentId);

            if ($result) {
                // Lấy lại danh sách bình luận mới nhất
                $feedback = $feedbackController->getFeedback($productId);
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Cảm ơn bạn đã để lại bình luận',
                    'feedbackList' => $feedback
                ]);
            } else {
                echo json_encode(['error' => 'Không thể thêm bình luận']);
            }
        } else {
            echo json_encode(["error" => "Invalid input data."]);
        }
        break;

    case 'PUT':
        // Sửa feedback
        $data = json_decode(file_get_contents('php://input'), true);
        $feedbackId = $data['id'] ?? null;
        $userId = $data['user_id'] ?? null;
        $comment = $data['body'] ?? '';
        $rating = $data['rating'] ?? 5;

        if ($feedbackId && $userId && $comment) {
            $result = $feedbackController->updateFeedback($feedbackId, $userId, $comment, $rating);
            if ($result) {
                // Sau khi cập nhật thành công, lấy lại danh sách bình luận mới nhất
                $feedback = $feedbackController->getFeedback($data['product_id']);
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Bình luận đã được cập nhật.',
                    'feedbackList' => $feedback,
                    'cssClass' => 'feedback-success' // Thêm class cho thông báo thành công
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Không thể cập nhật bình luận.',
                    'cssClass' => 'feedback-error' // Thêm class cho thông báo thất bại
                ]);
            }
        } else {
            echo json_encode(["error" => "Invalid input data."]);
        }
        break;

    case 'DELETE':
        // Xóa feedback
        $data = json_decode(file_get_contents("php://input"), true);
        $feedbackId = $data['id'] ?? null;

        if ($feedbackId) {
            $result = $feedbackController->deleteFeedback($feedbackId);
            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["error" => "Invalid feedback ID."]);
        }
        break;

    default:
        echo json_encode(["error" => "Method not allowed."]);
        break;
}
