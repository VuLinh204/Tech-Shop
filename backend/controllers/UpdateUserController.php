<?php
require_once '../models/UpdateUserModel.php';
require_once '../config/cors.php';
class UpdateUserController
{
    private $userModel;

    public function __construct($userModel)
    {
        $this->userModel = $userModel;
    }
    public function updateProduct($username, $phoneNumber, $address, $profile_picture, $userId)
    {
        $result = $this->userModel->UpdateUserModel($username, $phoneNumber, $address, $profile_picture, $userId);
        // Kiểm tra kết quả trả về từ model
        if ($result['status'] === 'success') {
            return json_encode(["status" => "success", "message" => $result['message']]);
        } else {
            // Nếu có lỗi, trả về thông báo lỗi
            return json_encode(["status" => "error", "message" => $result['message']]);
        }
    }
}
