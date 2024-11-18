<?php

require_once '../models/ColorModel.php';

class ColorController
{
    private $colorModel;

    public function __construct()
    {
        $this->colorModel = new ColorModel();
    }

    public function getAllColors($product_id = null)
    {
        // Kiểm tra xem có truyền product_id không
        if ($product_id) {
            // Nếu có, gọi phương thức fetchColorsByProductId với product_id
            $colors = $this->colorModel->fetchColorsByProductId($product_id);
        } else {
            // Nếu không có product_id, trả về thông báo lỗi hoặc danh sách màu mặc định
            return ['status' => 'error', 'message' => 'Product ID is required.'];
        }

        // Kiểm tra kết quả trả về
        if (empty($colors)) {
            // Nếu không có màu nào, trả về thông báo lỗi
            return ['status' => 'error', 'message' => 'No colors found for the given product ID.'];
        }

        // Trả về mảng màu sắc
        return ['status' => 'success', 'data' => $colors];
    }
}
