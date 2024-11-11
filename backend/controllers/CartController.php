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

    // Thêm sản phẩm vào giỏ hàng
    public function addToCart($userId, $productId, $quantity)
    {
        // Kiểm tra dữ liệu hợp lệ
        if ($userId && $productId && $quantity > 0) {
            // Gọi hàm addToCart trong model để thêm sản phẩm vào giỏ hàng
            $result = $this->cartItem->addToCart($userId, $productId, $quantity);

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
    public function deleteCartItem($cartItemId)
    {
        // Kiểm tra nếu sản phẩm tồn tại
        $result = $this->cartItem->getCartItemById($cartItemId);

        if ($result->num_rows === 0) {
            return ['status' => 'error', 'message' => 'Sản phẩm không tồn tại trong giỏ hàng.'];
        }

        // Xóa sản phẩm
        if ($this->cartItem->deleteCartItem($cartItemId)) {
            return ['status' => 'success', 'message' => 'Xóa sản phẩm thành công.'];
        } else {
            return ['status' => 'error', 'message' => 'Lỗi khi xóa sản phẩm khỏi giỏ hàng.'];
        }
    }
}
