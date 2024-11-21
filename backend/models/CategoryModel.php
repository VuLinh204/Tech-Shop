<?php
require_once '../config/database.php';

class Category
{
  private $conn;
  private $table = 'category';

  public function __construct()
  {
    $database = new Database();
    $this->conn = $database::$connection;
  }

  // Lấy tất cả danh mục
  public function getAllCategories()
  {
    $query = "SELECT category.id, category.name, COUNT(product.id) AS product_count FROM category AS category LEFT JOIN product ON category.id = product.category_id GROUP BY category.id;";
    $result = $this->conn->query($query);

    $categories = [];
    while ($row = $result->fetch_assoc()) {
      $categories[] = $row;
    }
    return $categories;
  }

  // Lấy danh mục với phân trang
  public function getCategories($limit, $offset)
  {
    $query = "SELECT * FROM {$this->table} LIMIT ? OFFSET ?";
    $stmt = $this->conn->prepare($query);
    $stmt->bind_param("ii", $limit, $offset);
    $stmt->execute();
    $result = $stmt->get_result();

    $categories = [];
    while ($row = $result->fetch_assoc()) {
      $categories[] = $row;
    }
    return $categories;
  }

  // Lấy tổng số danh mục
  public function getTotalCategories()
  {
    $query = "SELECT COUNT(*) as total FROM {$this->table}";
    $result = $this->conn->query($query);
    $row = $result->fetch_assoc();
    return $row['total'];
  }

  // Tạo danh mục mới
  public function createCategory($name, $thumbnail)
  {
    $query = "INSERT INTO {$this->table} (name, thumbnail) VALUES (?, ?)";
    $stmt = $this->conn->prepare($query);
    $stmt->bind_param("ss", $name, $thumbnail);
    return $stmt->execute();
  }

  // Cập nhật danh mục
  public function updateCategory($id, $name, $thumbnail)
  {
    $query = "UPDATE {$this->table} SET name = ?, thumbnail = ? WHERE id = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->bind_param("ssi", $name, $thumbnail, $id);
    return $stmt->execute();
  }

  // Xóa danh mục
  public function deleteCategory($id)
  {
    $query = "DELETE FROM {$this->table} WHERE id = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->bind_param("i", $id);
    return $stmt->execute();
  }
}
