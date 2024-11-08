<?php

require_once '../config/database.php';

class CartItem {
    private $conn;
    private $table_name = "cart_item";

    public function __construct()
    {
      $database = new Database();
      $this->conn = $database::$connection;
    }

    // Thêm sản phẩm vào giỏ hàng
    public function addToCart($userId, $productId, $quantity) {
        $query = "INSERT INTO " . $this->table_name . " (user_id, product_id, quantity) 
                  VALUES (?, ?, ?) 
                  ON DUPLICATE KEY UPDATE quantity = quantity + ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("iiii", $userId, $productId, $quantity, $quantity);
        
        return $stmt->execute();
    }

    // Lấy danh sách sản phẩm trong giỏ hàng
    public function getCartItems($userId) {
        $query = "SELECT p.id, p.name, p.thumbnail, p.price, ci.quantity, (ci.quantity * ci.price) AS total_price FROM cart_item ci JOIN cart c ON ci.cart_id = c.id JOIN product p ON ci.product_id = p.id WHERE c.user_id = ? AND c.status = 'active'";
    
        $stmt = $this->conn->prepare($query);
        
        // Kiểm tra nếu chuẩn bị câu lệnh thất bại
        if (!$stmt) {
            die("Lỗi chuẩn bị câu lệnh: " . $this->conn->error);
        }
    
        // Ràng buộc tham số và thực thi câu lệnh
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        
        // Lấy kết quả
        $result = $stmt->get_result();
        $cartItems = [];
        
        // Duyệt qua các kết quả và thêm vào mảng
        while ($row = $result->fetch_assoc()) {
            $cartItems[] = $row;
        }
        
        return $cartItems;
    }
};    
?>
