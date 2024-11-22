<?php
require_once '../models/OrderModel.php';

class OrderController
{
    private $orderModel;

    public function __construct()
    {
        $this->orderModel = new OrderModel();
    }

    public function checkout(array $data): array
    {
        try {
            $userId = $data['user_id'];
            $status = $data['status'];
            $discountId = $data['discount_id'] ?? null;
            $items = $data['items'];

            // Tạo đơn hàng
            $orderId = $this->orderModel->createOrder($userId, $status, $discountId);

            // Thêm sản phẩm vào đơn hàng
            foreach ($items as $item) {
                $this->orderModel->createOrderItem(
                    $orderId,
                    $item['product_id'],
                    $item['price'],
                    $item['quantity']
                );
            }

            return [
                'success' => true,
                'message' => 'Đơn hàng được tạo thành công!',
                'order_id' => $orderId
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ];
        }
    }
}
