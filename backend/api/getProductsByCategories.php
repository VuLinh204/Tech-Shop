<?php
include_once '../config/db.php';

$input = json_decode(file_get_contents("php://input"), true);
$categoryIds = $input['categoryIds'];

if (!empty($categoryIds)) {
    $in = implode(',', array_fill(0, count($categoryIds), '?'));
    $query = "SELECT * FROM product WHERE category_id IN ($in)";

    $stmt = $db->prepare($query);
    $stmt->execute($categoryIds);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($products);
} else {
    echo json_encode([]);
}
