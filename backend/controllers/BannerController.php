<?php
require_once '../models/BannerModel.php';

class BannerController
{
    private $model;

    public function __construct()
    {
        $this->model = new BannerModel();
    }

    // Lấy danh sách tất cả banners
    public function getBanners()
    {
        $banners = $this->model->getAllBanners();
        echo json_encode($banners);
    }

    // Lấy banner theo ID
    public function getBannerById($id)
    {
        $banner = $this->model->getBannerById($id);
        if ($banner) {
            echo json_encode($banner);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Banner not found']);
        }
    }

    // Thêm banner mới
    public function addBanner($data)
    {
        if ($this->model->createBanner($data)) {
            http_response_code(201);
            echo json_encode(["status" => "success", 'message' => 'Banner created successfully']);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", 'message' => 'Failed to create banner']);
        }
    }

    // Cập nhật banner
    public function updateBanner($data)
    {
        if (!isset($data['id']) || !isset($data['title']) || !isset($data['link'])) {
            // Nếu thiếu trường bắt buộc, trả về lỗi 400
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
            return;
        }

        $id = $data['id'];
        $title = $data['title'];
        $link = $data['link'];
        $image_url = isset($data['image_url']) ? $data['image_url'] : null;

        // Gọi phương thức updateBanner của model để cập nhật banner
        $result = $this->model->updateBanner($id, $title, $link, $image_url);

        if ($result) {
            // Nếu cập nhật thành công
            echo json_encode(["status" => "success", 'message' => 'Banner updated successfully']);
        } else {
            // Nếu có lỗi khi thực hiện câu lệnh SQL
            echo json_encode(["status" => "error", 'message' => 'Failed to update banner']);
        }
    }


    // Xóa banner
    public function deleteBanner($data)
    {

        // Gọi phương thức xóa banner từ model
        $result = $this->model->deleteBanner($data);

        // Kiểm tra kết quả trả về
        if ($result) {
            echo json_encode(['status' => 'success', 'message' => 'Banner deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete banner']);
        }
    }
}
