<?php
include_once '../config/database.php';
include_once '../config/cors.php';

$input = json_decode(file_get_contents("php://input"), true);
$categoryIds = $input['categoryIds'];

if (!empty($categoryIds)) {
    $db = Database::getConnection();

    $in = implode(',', array_fill(0, count($categoryIds), '?'));
    $query = "SELECT * FROM product WHERE category_id IN ($in)";

    $stmt = $db->prepare($query);
    $stmt->bind_param(str_repeat('i', count($categoryIds)), ...$categoryIds);

    // Thực thi truy vấn
    $stmt->execute();
    $result = $stmt->get_result();
    $products = $result->fetch_all(MYSQLI_ASSOC);


    echo json_encode($products);
} else {
    echo json_encode([]);
}
