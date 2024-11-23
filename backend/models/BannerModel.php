<?php
require_once '../config/database.php';
class BannerModel
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database::$connection;
    }
    // Lấy tất cả banners
    public function getAllBanners()
    {
        $query = "SELECT * FROM banners";
        $result = $this->conn->query($query);

        $banners = [];
        while ($row = $result->fetch_assoc()) {
            $banners[] = $row;
        }
        return $banners;
    }

    // Lấy banner theo ID
    public function getBannerById($id)
    {
        $query = "SELECT * FROM banners WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0 ? $result->fetch_assoc() : null;
    }

    // Tạo banner mới
    public function createBanner($data)
    {
        $query = "INSERT INTO banners (title, image_url, link) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('sss', $data['title'], $data['image_url'], $data['link']);
        return $stmt->execute();
    }

    // Cập nhật banner
    public function updateBanner($id, $title, $link, $image_url = null)
    {
        // Xây dựng câu truy vấn SQL
        $sql = "UPDATE banners SET title = ?, link = ?" . ($image_url ? ", image_url = ?" : "") . " WHERE id = ?";

        // Chuẩn bị câu lệnh SQL
        $stmt = $this->conn->prepare($sql);

        if ($stmt === false) {
            // Ghi log lỗi nếu không thể chuẩn bị câu lệnh SQL
            error_log("Error preparing SQL statement: " . $this->conn->error);
            return;
        }

        // Ràng buộc tham số
        if ($image_url) {
            $stmt->bind_param('sssi', $title, $link, $image_url, $id);
        } else {
            $stmt->bind_param('ssi', $title, $link, $id);
        }

        // Thực thi câu lệnh SQL
        return $stmt->execute();
    }


    // Xóa banner
    public function deleteBanner($id)
    {
        // Kiểm tra nếu ID là số hợp lệ
        if (!is_numeric($id) || $id <= 0) {
            // Log lỗi hoặc thông báo lỗi nếu ID không hợp lệ
            error_log("Invalid banner ID: " . $id);
            return false; // Trả về false nếu ID không hợp lệ
        }

        $sql = "DELETE FROM banners WHERE id = ?";

        $stmt = $this->conn->prepare($sql);

        if ($stmt === false) {
            error_log("Error preparing SQL statement: " . $this->conn->error);
            return false;
        }
        $stmt->bind_param('i', $id);
        return $stmt->execute();
    }
}
