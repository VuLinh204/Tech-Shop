<?php
require_once '../models/OrderModel.php';

class OrderController
{
    private $orderModel;

    public function __construct()
    {
        $this->orderModel = new OrderModel();
    }

    public function createFullOrder(array $data): array
    {
        // Bắt đầu giao dịch
        $connection = $this->orderModel::getConnection();
        $connection->begin_transaction();

        try {
            // Lấy dữ liệu từ mảng đầu vào
            $userId = $data['user_id'];
            $status = $data['status'];
            $discountId = isset($data['discount_id']) ? $data['discount_id'] : null;
            $totalQuantity = $data['totalQuantity'];
            $totalPrice = $data['totalPrice'];
            $deliveryOption = $data['deliveryOption'];
            $paymentMethod = $data['paymentMethod'];
            $items = $data['items']; // Danh sách sản phẩm

            // Tạo đơn hàng mới
            $orderId = $this->orderModel->createOrder(
                $userId,
                $status,
                $discountId,
                $totalQuantity,
                $totalPrice,
                $deliveryOption,
                $paymentMethod
            );

            // Thêm các sản phẩm vào đơn hàng
            foreach ($items as $item) {
                $this->orderModel->createOrderItem(
                    $orderId,
                    $item['product_id'],
                    $item['price'],
                    $item['quantity']
                );
            }

            // Xác nhận giao dịch
            $connection->commit();

            return [
                'success' => true,
                'message' => 'Đơn hàng đã được tạo thành công!',
                'order_id' => $orderId
            ];
        } catch (Exception $e) {
            // Rollback giao dịch nếu có lỗi
            $connection->rollback();

            return [
                'success' => false,
                'message' => 'Lỗi khi tạo đơn hàng: ' . $e->getMessage()
            ];
        }
    }
}
