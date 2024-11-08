<?php
require_once '../models/CartItem.php';

class CartController {
    private $cartItem;

    public function __construct() {
        $this->cartItem = new CartItem();
    }

    // Lấy danh sách sản phẩm trong giỏ hàng
    public function getCartItems($userId) {
        return $this->cartItem->getCartItems($userId);
    }
}
?>
