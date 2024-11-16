<?php
require_once '../config/database.php';

class ColorModel
{
    private $conn;
    private $table = 'product_color'; // Tên bảng trung gian

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database::$connection;
    }

    public function fetchColorsByProductId($product_id)
    {
        // Câu truy vấn kết hợp giữa bảng product_color và color
        $query = "
            SELECT c.name AS color_name
            FROM color c
            INNER JOIN {$this->table} pc ON c.id = pc.color_id
            WHERE pc.product_id = ?
        ";

        // Chuẩn bị câu truy vấn
        if ($stmt = $this->conn->prepare($query)) {
            // Gán giá trị cho tham số
            $stmt->bind_param("i", $product_id); // "i" là kiểu dữ liệu integer

            // Thực thi câu truy vấn
            $stmt->execute();

            // Lấy kết quả
            $result = $stmt->get_result();

            $colors = []; // Mảng để chứa các màu sắc

            // Lặp qua các hàng kết quả
            while ($row = $result->fetch_assoc()) {
                $colors[] = $row['color_name']; // Thêm tên màu vào mảng
            }

            // Đóng statement
            $stmt->close();
        }

        return $colors; // Trả về mảng tên màu sắc
    }
}
