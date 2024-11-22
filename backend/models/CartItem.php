<?php

require_once '../config/database.php';

class CartItem
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database::$connection;
    }

    // Lấy Cart ID của người dùng
    private function getCartId($userId)
    {
        $query = "SELECT id FROM cart WHERE user_id = ? AND status = 'active' LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['id'];
        } else {
            return null; // Nếu không có giỏ hàng, trả về null
        }
    }

    // Tạo giỏ hàng mới cho người dùng nếu chưa có giỏ hàng
    private function createCart($userId)
    {
        $query = "INSERT INTO cart (user_id, status) VALUES (?, 'active')";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $userId);
        if ($stmt->execute()) {
            return $this->conn->insert_id;
        } else {
            return null;
        }
    }

    public function getCartItemById($cartItemId)
    {
        $query = "SELECT * FROM cart_item WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $cartItemId);
        $stmt->execute();
        return $stmt->get_result();
    }

    // Thêm sản phẩm vào giỏ hàng
    public function addToCart($userId, $productId, $quantity, $color)
    {
        // Lấy Cart ID, nếu chưa có thì tạo giỏ hàng mới
        $cartId = $this->getCartId($userId);
        if ($cartId === null) {
            // Nếu chưa có giỏ hàng, tạo mới giỏ hàng
            $cartId = $this->createCart($userId);
            if ($cartId === null) {
                return false; // Nếu không thể tạo giỏ hàng, trả về false
            }
        }

        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        $query = "SELECT * FROM cart_item WHERE cart_id = ? AND product_id = ? AND color = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("iis", $cartId, $productId, $color);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Sản phẩm đã có trong giỏ hàng, cập nhật số lượng
            return $this->updateCartItem($cartId, $productId, $quantity, $color);
        } else {
            // Sản phẩm chưa có trong giỏ hàng, thêm mới
            return $this->insertCartItem($cartId, $productId, $quantity, $color);
        }
    }

    function updateToCart($userId, $productId, $quantity, $color)
    {
        $query = "UPDATE cart_item SET quantity = ? WHERE cart_id = (SELECT id FROM cart WHERE user_id = ? AND status = 'active') AND product_id = ? AND color = ?";

        $stmt = $this->conn->prepare($query);

        if (!$stmt) {
            die("Lỗi chuẩn bị câu lệnh: " . $this->conn->error);
        }

        $stmt->bind_param("iiis", $quantity, $userId, $productId, $color);
        return $stmt->execute();
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    public function updateCartItem($cartId, $productId, $quantity, $color)
    {
        $query = "UPDATE cart_item SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ? AND color = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("iiis", $quantity, $cartId, $productId, $color);
        return $stmt->execute();
    }

    // Thêm sản phẩm mới vào giỏ hàng
    private function insertCartItem($cartId, $productId, $quantity, $color)
    {
        $query = "INSERT INTO cart_item (cart_id, product_id, quantity, color) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("iiis", $cartId, $productId, $quantity, $color);
        return $stmt->execute();
    }

    // Lấy danh sách sản phẩm trong giỏ hàng
    public function getCartItems($userId)
    {
        $query = "SELECT 
        p.id AS product_id, 
        p.name AS product_name, 
        p.thumbnail, 
        p.price, 
        p.description,
        ci.id AS cart_item_id,          
        ci.quantity, 
        (ci.quantity * p.price) AS total_price, 
        GROUP_CONCAT(DISTINCT col.name ORDER BY col.name ASC) AS color_names,
        ci.color AS cart_item_color,
        p.discount_percent,
        cat.name AS category_name
    FROM cart_item ci
    JOIN cart c ON ci.cart_id = c.id
    JOIN product p ON ci.product_id = p.id
    LEFT JOIN product_color pc ON p.id = pc.product_id
    LEFT JOIN color col ON pc.color_id = col.id
    LEFT JOIN category cat ON p.category_id = cat.id
    WHERE c.user_id = ? AND c.status = 'active'
    GROUP BY p.id, ci.id, ci.quantity, ci.color";

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
                'description'   => $row['description'],
                'quantity'      => $row['quantity'],
                'total_price'   => $row['total_price'],
                'color_names'   => $row['color_names'],
                'cart_item_color' => $row['cart_item_color'],
                'discount_percent' => $row['discount_percent'] ?? 0,
                'category_name' => $row['category_name'],
                'cart_item_id'  => $row['cart_item_id']
            ];
        }

        return $cartItems;
    }

    public function deleteCartItem($cartItemId)
    {
        $query = "DELETE FROM cart_item WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $cartItemId);
        return $stmt->execute();
    }
}
