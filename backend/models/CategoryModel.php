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
    $query = "SELECT * FROM {$this->table}";
    $result = $this->conn->query($query);

    $categories = [];
    while ($row = $result->fetch_assoc()) {
      $categories[] = $row;
    }
    return $categories;
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
