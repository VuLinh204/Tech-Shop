<?php
require_once '../models/Product_Model.php';
class ProductController
{
    private $product;

    public function __construct($product)
    {
        $this->product = $product;
    }

    // Lấy tất cả sản phẩm
    public function getAllProducts()
    {
        $products = $this->product->getAllProduct();
        echo $products;
    }

    //lấy sản phẩm theo id
    public function getProductById($id)
    {
        $products = $this->product->getProductById($id);
        echo $products;
    }
    // Tạo sản phẩm mới
    public function createProduct($product)
    {
        $result = $this->product->createProduct($product);
        echo $result;
    }

    // Cập nhật sản phẩm
    public function updateProduct($product)
    {
        return $this->product->updateProduct($product);
    }

    // Xóa sản phẩm
    public function deleteProduct($id)
    {
        return $this->product->deleteProduct($id);
    }

    //tìm kiếm sản phẩm
    public function searchProduct($keyword)
    {
        $products = $this->product->seachProduct($keyword);
        echo json_encode($products);
    }
}
