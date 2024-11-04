<?php
require_once '../models/CategoryModel.php';

class CategoryController
{
  private $category;

  public function __construct()
  {
    $this->category = new Category();
  }

  // Lấy tất cả danh mục
  public function getAllCategories()
  {
    return $this->category->getAllCategories();
  }

  // Lấy danh mục với phân trang
  public function getCategories($limit, $offset)
  {
    return $this->category->getCategories($limit, $offset);
  }

  // Lấy tổng số danh mục
  public function getTotalCategories()
  {
    return $this->category->getTotalCategories();
  }

  // Tạo danh mục
  public function createCategory($name, $thumbnail)
  {
    return $this->category->createCategory($name, $thumbnail);
  }

  // Cập nhật danh mục
  public function updateCategory($id, $name, $thumbnail)
  {
    return $this->category->updateCategory($id, $name, $thumbnail);
  }

  // Xóa danh mục
  public function deleteCategory($id)
  {
    return $this->category->deleteCategory($id);
  }
}
