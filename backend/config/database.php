<?php
require_once 'config.php';

class Database
{
    public static $connection;
    public function __construct()
    {
        if (!self::$connection) {
            self::$connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT);
            self::$connection->set_charset(DB_CHARSET);
        }
    }
    public static function getConnection()
    {
        // Kiểm tra kết nối và tạo nếu chưa có
        if (!self::$connection) {
            new self(); // Gọi constructor để tạo kết nối
        }
        return self::$connection;
    }
}
?>