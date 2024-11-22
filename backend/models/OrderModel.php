<?php
require_once '../config/database.php';

class OrderModel extends Database
{
    public function createOrder($userId, $status, ?int $discountId): int
    {
        $connection = self::getConnection();

        $stmt = $connection->prepare("
            INSERT INTO `order` (`user_id`, `order_date`, `status`, `discount_id`) 
            VALUES (?, NOW(), ?, ?)
        ");

        // Kiểm tra chuẩn bị truy vấn
        if (!$stmt) {
            die('Lỗi chuẩn bị truy vấn: ' . $connection->error);
        }

        // Gán giá trị và thực thi truy vấn
        $stmt->bind_param('iii', $userId, $status, $discountId);
        $stmt->execute();

        // Kiểm tra lỗi thực thi
        if ($stmt->error) {
            die('Lỗi thực thi truy vấn: ' . $stmt->error);
        }

        // Lấy ID của đơn hàng vừa tạo
        $orderId = $stmt->insert_id;

        // Đóng statement
        $stmt->close();

        return $orderId;
    }

    public function createOrderItem($orderId, $productId, $price, $quantity)
    {
        $connection = self::getConnection();

        $stmt = $connection->prepare("
            INSERT INTO `order_item` (`order_id`, `product_id`, `price`, `num`) 
            VALUES (?, ?, ?, ?)
        ");

        if (!$stmt) {
            die('Lỗi chuẩn bị truy vấn: ' . $connection->error);
        }

        $stmt->bind_param('iidi', $orderId, $productId, $price, $quantity);
        $stmt->execute();

        if ($stmt->error) {
            die('Lỗi thực thi truy vấn: ' . $stmt->error);
        }

        $stmt->close();
    }
}
