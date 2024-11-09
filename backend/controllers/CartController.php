<?php
require_once '../models/CartItem.php';

class CartController
{
    private $cartItem;

    public function __construct()
    {
        $this->cartItem = new CartItem();
    }

    // Lấy danh sách sản phẩm trong giỏ hàng
    public function getCartItems($userId)
    {
        return $this->cartItem->getCartItems($userId);
    }

    // Thêm sản phẩm vào giỏ hàng (không cần POST)
    public function addToCart($cartId, $productId, $quantity)
    {
        // Kiểm tra xem dữ liệu có hợp lệ không
        if ($cartId && $productId && $quantity > 0) {
            // Thêm sản phẩm vào giỏ hàng thông qua model
            $result = $this->cartItem->addToCart($cartId, $productId, $quantity);

            // Nếu thêm thành công
            if ($result) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Sản phẩm đã được thêm vào giỏ hàng.'
                ]);
            } else {
                // Nếu có lỗi xảy ra
                echo json_encode([
                    'success' => false,
                    'message' => 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.'
                ]);
            }
        } else {
            // Trả về lỗi nếu thiếu thông tin
            echo json_encode([
                'success' => false,
                'message' => 'Thông tin không hợp lệ.'
            ]);
        }
    }
}
