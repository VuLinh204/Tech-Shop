<?php
require_once '../config/database.php';
require_once '../config/cors.php';

// Lấy kết nối cơ sở dữ liệu
$conn = Database::getConnection();

if (isset($_GET['product_id'])) {
    $productId = $_GET['product_id'];
    $page = isset($_GET['page']) ? $_GET['page'] : 1;  // Trang hiện tại
    $limit = 5;  // Số lượng sản phẩm mỗi trang
    $offset = ($page - 1) * $limit;  // Tính toán offset

    // Lấy category_id của sản phẩm từ product_id
    $query = "SELECT category_id FROM product WHERE id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("i", $productId);
        $stmt->execute();
        $result = $stmt->get_result();

        // Kiểm tra xem sản phẩm có tồn tại không
        if ($result->num_rows > 0) {
            $product = $result->fetch_assoc();
            $categoryId = $product['category_id'];

            // Truy vấn các sản phẩm thuộc cùng danh mục với phân trang
            $queryRelated = "SELECT * FROM product WHERE category_id = ? LIMIT ?, ?";
            $stmtRelated = $conn->prepare($queryRelated);

            if ($stmtRelated) {
                $stmtRelated->bind_param("iii", $categoryId, $offset, $limit);
                $stmtRelated->execute();
                $resultRelated = $stmtRelated->get_result();

                // Lấy danh sách sản phẩm liên quan
                $relatedProducts = $resultRelated->fetch_all(MYSQLI_ASSOC);
                echo json_encode($relatedProducts);
            } else {
                echo json_encode(["error" => "Lỗi truy vấn: " . $conn->error]);
            }
        } else {
            echo json_encode(["error" => "Sản phẩm không tồn tại"]);
        }
    } else {
        echo json_encode(["error" => "Lỗi truy vấn: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Thiếu product_id trong URL"]);
}

$conn->close();
?>
