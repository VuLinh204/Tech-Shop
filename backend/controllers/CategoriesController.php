<?php
require_once '../models/CategoryModel.php';

class CategoryController
{
  private $category;

  public function __construct()
  {
    $this->category = new Category();
  }

  public function getAllCategories()
  {
    return $this->category->getAllCategories();
  }

  public function createCategory($name, $thumbnail)
  {
    return $this->category->createCategory($name, $thumbnail);
  }

  public function updateCategory($id, $name, $thumbnail)
  {
    return $this->category->updateCategory($id, $name, $thumbnail);
  }

  public function deleteCategory($id)
  {
    return $this->category->deleteCategory($id);
  }
}
