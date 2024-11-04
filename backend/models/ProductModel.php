<?php
require_once '../config/database.php';

class Product
{
    private $conn;
    private $table = 'product'; // Đặt tên bảng cho sản phẩm

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database::$connection; // Sử dụng kết nối tĩnh
    }

    // Lấy tất cả sản phẩm
    public function getAll($category_id = null)
    {
        if ($category_id) {
            $query = "SELECT * FROM {$this->table} WHERE deleted_at IS NULL AND category_id = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param('i', $category_id); // 'i' chỉ định kiểu INT
        } else {
            $query = "SELECT * FROM {$this->table} WHERE deleted_at IS NULL";
            $stmt = $this->conn->prepare($query);
        }

        $stmt->execute();
        $result = $stmt->get_result(); // Lấy kết quả từ truy vấn

        // Trả về tất cả sản phẩm
        return $result->fetch_all(MYSQLI_ASSOC); // Lấy tất cả dữ liệu dưới dạng mảng
    }

    // Tạo sản phẩm mới
    public function createProduct($name, $thumbnail, $price, $category_id)
    {
        $query = "INSERT INTO {$this->table} (name, thumbnail, price, category_id) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ssdi", $name, $thumbnail, $price, $category_id); // 'd' chỉ định kiểu DOUBLE cho price
        return $stmt->execute();
    }

    // Cập nhật sản phẩm
    public function updateProduct($id, $name, $thumbnail, $price, $category_id)
    {
        $query = "UPDATE {$this->table} SET name = ?, thumbnail = ?, price = ?, category_id = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ssdii", $name, $thumbnail, $price, $category_id, $id); // 'i' cho ID
        return $stmt->execute();
    }

    // Xóa sản phẩm
    public function deleteProduct($id)
    {
        $query = "DELETE FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
    public function getProductById($id)
    {
        $query = "SELECT * FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_assoc(); // Trả về sản phẩm
    }
}
