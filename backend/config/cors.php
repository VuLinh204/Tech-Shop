<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Đổi thành nguồn cần thiết nếu cần
header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS"); // Các phương thức cho phép
header("Access-Control-Allow-Headers: Content-Type"); // Các tiêu đề cho phép
header("Access-Control-Allow-Credentials: true"); // Cho phép cookie


// Nếu là yêu cầu OPTIONS, trả về 200 và dừng lại
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
