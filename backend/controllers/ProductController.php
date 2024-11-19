<?php
require_once '../models/ProductModel.php';

class ProductController
{
    private $product;

    public function __construct()
    {
        $this->product = new Product();
    }

    // Lấy tất cả sản phẩm
    public function getAllProducts($category_id = null)
    {
        return $this->product->getAll($category_id);
    }

    // Tạo sản phẩm mới
    public function createProduct($name, $thumbnail, $price, $category_id)
    {
        return $this->product->createProduct($name, $thumbnail, $price, $category_id);
    }

    // Cập nhật sản phẩm
    public function updateProduct($id, $name, $thumbnail, $price, $category_id)
    {
        return $this->product->updateProduct($id, $name, $thumbnail, $price, $category_id);
    }

    // Xóa sản phẩm
    public function deleteProduct($id)
    {
        return $this->product->deleteProduct($id);
    }
    public function getProductById($id)
    {
        return $this->product->getProductById($id);
    }
    // Lấy tổng số sản phẩm
    public function getTotalProducts()
    {
        return $this->product->getTotal();
    }
}
