<?php
require_once '../config/database.php';

class ColorModel
{
    private $conn;
    private $table = 'color'; // Tên bảng màu

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database::$connection;
    }


    public function fetchAllColors()
    {
        $query = "SELECT * FROM {$this->table}"; // Truy vấn để lấy tất cả các màu
        $result = $this->conn->query($query); // Thực hiện truy vấn

        $colors = []; // Mảng để chứa các màu sắc
        while ($row = $result->fetch_assoc()) { // Lặp qua các hàng kết quả
            $colors[] = $row; // Thêm màu vào mảng

        }

        return $colors; // Trả về mảng màu sắc
    }
}

