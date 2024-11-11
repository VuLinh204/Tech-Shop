<?php

require_once '../config/database.php';

class CartItem
{
    private $conn;
    private $table_name = "cart_item";

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database::$connection;
    }

    // Kiểm tra và lấy hoặc tạo giỏ hàng mới cho người dùng
    private function getOrCreateCartId($userId)
    {
        // Khởi tạo $cartId là null
        $cartId = null;
        // Kiểm tra giỏ hàng active của người dùng
        $query = "SELECT id FROM cart WHERE user_id = ? AND status = 'active' LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $stmt->bind_result($cartId);
        $stmt->fetch();
        $stmt->close();

        // Nếu không có giỏ hàng active, tạo mới một giỏ hàng
        if (!$cartId) {
            $query = "INSERT INTO cart (user_id, status, created_at) VALUES (?, 'active', NOW())";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $cartId = $stmt->insert_id; // Lấy cart_id mới tạo
            $stmt->close();
        }

        return $cartId;
    }

    // Thêm sản phẩm vào giỏ hàng
    public function addToCart($userId, $productId, $quantity)
    {
        // Lấy hoặc tạo cart_id cho người dùng
        $cartId = $this->getOrCreateCartId($userId);

        // Câu truy vấn thêm sản phẩm vào giỏ hàng hoặc cập nhật số lượng nếu sản phẩm đã tồn tại
        $query = "INSERT INTO " . $this->table_name . " (cart_id, product_id, quantity) 
                  VALUES (?, ?, ?) 
                  ON DUPLICATE KEY UPDATE quantity = quantity + ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("iiii", $cartId, $productId, $quantity, $quantity);

        return $stmt->execute();
    }

    // Lấy danh sách sản phẩm trong giỏ hàng
    public function getCartItems($userId)
    {
        $query = "
            SELECT 
                p.id AS product_id, 
                p.name AS product_name, 
                p.thumbnail, 
                p.price, 
                p.description,
                ci.quantity, 
                (ci.quantity * p.price) AS total_price, 
                GROUP_CONCAT(DISTINCT col.name ORDER BY col.name ASC) AS color_names,
                p.discount_percent
            FROM cart_item ci
            JOIN cart c ON ci.cart_id = c.id
            JOIN product p ON ci.product_id = p.id
            LEFT JOIN product_color pc ON p.id = pc.product_id
            LEFT JOIN color col ON pc.color_id = col.id
            WHERE c.user_id = ? AND c.status = 'active'
            GROUP BY p.id, ci.quantity;
        ";

        $stmt = $this->conn->prepare($query);

        if (!$stmt) {
            die("Lỗi chuẩn bị câu lệnh: " . $this->conn->error);
        }

        $stmt->bind_param("i", $userId);
        $stmt->execute();

        $result = $stmt->get_result();
        $cartItems = [];

        while ($row = $result->fetch_assoc()) {
            // Thêm các thông tin vào mảng cartItems
            $cartItems[] = [
                'product_id'    => $row['product_id'],
                'product_name'  => $row['product_name'],
                'thumbnail'     => $row['thumbnail'],
                'price'         => $row['price'],
                'description'   => $row['description'],  // Nếu có mô tả
                'quantity'      => $row['quantity'],
                'total_price'   => $row['total_price'],
                'color_names'   => $row['color_names'],
                'discount_percent' => $row['discount_percent'] ?? 0,  // Mặc định 0 nếu không có chiết khấu
                'stock_quantity'  => $row['stock_quantity'] ?? 0  // Mặc định 0 nếu không có thông tin tồn kho
            ];
        }

        return $cartItems;
    }
}
