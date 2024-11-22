<?php

require_once '../models/CartItem.php';

class CartController
{
    private $cartItem;

    public function __construct()
    {
        $this->cartItem = new CartItem();
    }

    // Thêm sản phẩm vào giỏ hàng
    public function addToCart($userId, $productId, $quantity, $color)
    {
        // Kiểm tra và thêm sản phẩm vào giỏ hàng
        return $this->cartItem->addToCart($userId, $productId, $quantity, $color);
    }

    // Lấy danh sách sản phẩm trong giỏ hàng
    public function getCartItems($userId)
    {
        return $this->cartItem->getCartItems($userId);
    }

    // Sửa sản phẩm trong giỏ hàng
    public function updateToCart($userId, $productId, $quantity, $color)
    {
        // Kiểm tra và thêm sản phẩm vào giỏ hàng
        return $this->cartItem->updateToCart($userId, $productId, $quantity, $color);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public function deleteCartItem($cartItemId)
    {
        return $this->cartItem->deleteCartItem($cartItemId);
    }
}
