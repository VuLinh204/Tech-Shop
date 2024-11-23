<?php
require_once '../config/database.php';

class OrderModel extends Database
{
    public function createOrder(int $userId, int $status, ?int $discountId, int $totalQuantity, float $totalPrice, ?string $deliveryOption, ?string $paymentMethod): int
    {
        $connection = self::getConnection();

        $stmt = $connection->prepare("INSERT INTO `order` 
            (`user_id`, `status`, `discount_id`, `total_quantity`, `total_price`, `delivery_option`, `payment_method`, `created_at`, `updated_at`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");

        if (!$stmt) {
            die('Lỗi chuẩn bị truy vấn: ' . $connection->error);
        }

        // Gán giá trị và thực thi truy vấn
        $stmt->bind_param('iiidsss', $userId, $status, $discountId, $totalQuantity, $totalPrice, $deliveryOption, $paymentMethod);
        $stmt->execute();

        if ($stmt->error) {
            die('Lỗi thực thi truy vấn: ' . $stmt->error);
        }

        // Lấy ID của đơn hàng vừa tạo
        $orderId = $stmt->insert_id;

        // Đóng statement
        $stmt->close();

        return $orderId;
    }

    public function createOrderItem(int $orderId, int $productId, float $price, int $quantity): void
    {
        $connection = self::getConnection();

        $stmt = $connection->prepare("INSERT INTO `order_item` 
            (`order_id`, `product_id`, `price`, `quantity`) 
            VALUES (?, ?, ?, ?)");

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
    public function getOrdersByUserId($userId)
    {
        $connection = self::getConnection(); // Lấy kết nối
        $query = "SELECT id, total_price AS total_amount, 
                         CASE 
                             WHEN status = 1 THEN 'Đang Xử Lý'
                             WHEN status = 2 THEN 'Đã Thanh Toán'
                             WHEN status = 3 THEN 'Đã Giao Hàng'
                             WHEN status = 4 THEN 'Đã Hủy'
                             ELSE 'Không Xác Định'
                         END AS status
                  FROM `order`
                  WHERE user_id = ?"; // Dùng ký tự `?` thay vì `:user_id` cho mysqli

        // Chuẩn bị câu truy vấn
        $stmt = $connection->prepare($query);

        if (!$stmt) {
            die('Lỗi chuẩn bị truy vấn: ' . $connection->error);
        }

        // Gán giá trị cho tham số
        $stmt->bind_param('i', $userId); // `i` cho kiểu integer

        // Thực thi truy vấn
        $stmt->execute();

        if ($stmt->error) {
            die('Lỗi thực thi truy vấn: ' . $stmt->error);
        }

        // Lấy kết quả
        $result = $stmt->get_result();
        $orders = $result->fetch_all(MYSQLI_ASSOC);

        // Đóng statement
        $stmt->close();

        return $orders;
    }
}
