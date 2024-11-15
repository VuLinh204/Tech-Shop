<?php
require_once '../config/database.php';
class Product_Model extends Database
{
    //Lấy tất cả thông tin sản phẩm
    public function getAllProduct()
    {
        $query = "SELECT p.id, p.name, p.price, p.description, p.quantity,
                         GROUP_CONCAT(cl.name SEPARATOR ', ') as color, p.discount_percent,
                         p.thumbnail, c.name AS category_name FROM product p
                  LEFT JOIN category c on p.category_id = c.id
                  LEFT JOIN product_color pc on p.id = pc.product_id
                  LEFT JOIN color cl on pc.color_id = cl.id
                  GROUP BY p.id";

        try {
            $stmt = self::$connection->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result) {
                $products = $result->fetch_all(MYSQLI_ASSOC);

                foreach ($products as $product) {
                    if (empty($product['color'])) {
                        $product['color'] = [];
                    } else {
                        // Tách chuỗi màu sắc thành mảng
                        $product['color'] = explode(', ', $product['color']);
                    }
                }
                return json_encode($products, JSON_UNESCAPED_UNICODE);
            } else {
                return json_encode([]);
            }
        } catch (Exception $e) {
            return json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    }

    //lấy sản phẩm theo id
    public function getProductByIdModel($id)
    {
        $query = "SELECT p.id, p.name, p.price, p.description, p.quantity,
                     GROUP_CONCAT(cl.name SEPARATOR ', ') as color, p.discount_percent,
                     p.thumbnail, c.name AS category_name, c.id AS category_id FROM product p
              LEFT JOIN category c on p.category_id = c.id
              LEFT JOIN product_color pc on p.id = pc.product_id
              LEFT JOIN color cl on pc.color_id = cl.id
              WHERE p.id = ?
              GROUP BY p.id";

        try {
            $stmt = self::$connection->prepare($query);
            $stmt->bind_param("i", $id); // Truyền tham số `id` vào câu truy vấn
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 0) {
                return ["status" => "error", "message" => "Sản phẩm không tồn tại"];
            } else {
                $product = $result->fetch_assoc();
                if (!empty($product)) {
                    // Tách chuỗi màu sắc thành mảng nếu có giá trị
                    $product['color'] = empty($product['color']) ? [] : explode(', ', $product['color']);
                    return ["status" => "success", "product" => $product];
                }
            }
        } catch (Exception $e) {
            return ["status" => "error", "message" => $e->getMessage()];
        }
    }

    //Validate product
    // public function validateProduct($product)
    // {
    //     $errors = [];

    //     // Kiểm tra tên sản phẩm
    //     if (empty($product->name)) {
    //         $errors[] = "Tên sản phẩm không được để trống.";
    //     } elseif (strlen($product->name) < 3) {
    //         $errors[] = "Tên sản phẩm phải có ít nhất 3 ký tự.";
    //     } elseif (strlen($product->name) > 100) {
    //         $errors[] = "Tên sản phẩm không vượt quá 100 ký tự.";
    //     } elseif (!preg_match('/^[a-zA-Z0-9\s]+$/u', $product->name)) {
    //         $errors[] = "Tên sản phẩm chứa ký tự không hợp lệ.";
    //     }

    //     // Kiểm tra giá sản phẩm
    //     if (!is_numeric($product->price) || $product->price < 0) {
    //         $errors[] = "Giá sản phẩm phải là số dương hợp lệ.";
    //     }

    //     // Kiểm tra mô tả sản phẩm
    //     if (empty($product->description)) {
    //         $errors[] = "Mô tả sản phẩm không được để trống.";
    //     }

    //     // Kiểm tra danh mục sản phẩm
    //     if (empty($product->category_id)) {
    //         $errors[] = "Vui lòng chọn danh mục cho sản phẩm.";
    //     }

    //     return $errors;
    // }

    //Kiểm tra color và thêm color
    public function addColorsToProduct($productId, $colors)
    {
        if (!empty(is_array($colors) && $colors)) {
            foreach ($colors as $colorName) {
                // Kiểm tra màu có tồn tại trong bảng `color` chưa
                $colorQuery = "SELECT id FROM color WHERE name = ?";
                $colorStmt = self::$connection->prepare($colorQuery);
                $colorStmt->bind_param("s", $colorName);
                $colorStmt->execute();
                $colorResult = $colorStmt->get_result();

                if ($colorRow = $colorResult->fetch_assoc()) {
                    $colorId = $colorRow['id'];
                } else {
                    // Nếu màu không tồn tại, thêm màu mới vào bảng `color`
                    $insertColorQuery = "INSERT INTO color (name) VALUES (?)";
                    $insertColorStmt = self::$connection->prepare($insertColorQuery);
                    $insertColorStmt->bind_param("s", $colorName);
                    $insertColorStmt->execute();
                    $colorId = self::$connection->insert_id;
                }

                // Thêm màu vào `product_color`
                $insertProductColorQuery = "INSERT INTO product_color (product_id, color_id) VALUES (?, ?)";
                $insertProductColorStmt = self::$connection->prepare($insertProductColorQuery);
                $insertProductColorStmt->bind_param("ii", $productId, $colorId);
                $insertProductColorStmt->execute();
            }
        }
    }

    //Thêm sản phẩm
    public function createProductModel($product)
    {
        $query = "INSERT INTO product (name, description, category_id, price, quantity, discount_percent, thumbnail)
              VALUES(?,?,?,?,?,?,?)";
        try {
            $stmt = self::$connection->prepare($query);
            $stmt->bind_param(
                "ssidiis",
                $product['name'],
                $product['description'],
                $product['category_id'],
                $product['price'],
                $product['quantity'],
                $product['discount_percent'],
                $product['thumbnail']
            );

            if ($stmt->execute()) {
                $productId = self::$connection->insert_id;
                $productColor = $product['color'];
                // Thêm màu sắc sản phẩm nếu có
                if (!empty($productColor)) {
                    $this->addColorsToProduct($productId, $productColor);
                }
                return ["status" => "success", "message" => "Sản phẩm đã được thêm thành công"];
            } else {
                // Trả về lỗi nếu câu lệnh không thực thi thành công
                return ["status" => "error", "message" => "Không thể thêm sản phẩm"];
            }
        } catch (Exception $e) {
            return ["status" => "error", "message" => $e->getMessage()];
        }
    }


    //Sửa sản phẩm
    public function updateProduct($product)
    {
        $query = "UPDATE product SET name = ?, description = ?, category_id = ?, price = ?,quantity = ?, 
        discount_percent = ?, thumbnail = ? WHERE id = ?";

        if ($stmt = self::$connection->prepare($query)) {
            $stmt->bind_param(
                "ssidiisi",
                $product->name,
                $product->description,
                $product->category_id,
                $product->price,
                $product->quantity,
                $product->discount_percent,
                $product->thumbnail,
                $product->id
            );

            if ($stmt->execute()) {
                $deleteColorQuery = "DELETE FROM product_color WHERE product_id = ?";
                $deleteColorStmt = self::$connection->prepare($deleteColorQuery);
                $deleteColorStmt->bind_param("i", $product->id);
                $deleteColorStmt->execute();
                $this->addColorsToProduct($product->id, $product->color);
                return ["status" => "success", "message" => "Sản phẩm đã được cập nhật thành công"];
            } else {
                // Thông báo lỗi rõ ràng nếu việc cập nhật thất bại
                return ["status" => "error", "message" => "Cập nhật sản phẩm thất bại: " . $stmt->error];
            }
        } else {
            // Thông báo lỗi khi không thể chuẩn bị câu truy vấn
            return ["status" => "error", "message" => "Lỗi khi chuẩn bị câu truy vấn: " . self::$connection->error];
        }
    }


    //Xóa sản phẩm
    public function deleteProduct($id)
    {
        //kiểm tra sản phẩm có tồn tại hay không
        $selectIdProduct = "SELECT id FROM product WHERE id = ?";
        $stmt = self::$connection->prepare($selectIdProduct);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        // Nếu sản phẩm không tồn tại hoặc đã bị xóa, trả về thông báo lỗi
        if ($result->num_rows === 0) {
            return ["status" => "error", "message" => "Sản phẩm không tồn tại"];
        }
        $query = "DELETE FROM product WHERE id = ?";
        $stmt = self::$connection->prepare($query);
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Xóa sản phẩm thành công"];
        } else {
            return ["status" => "error", "message" => "Xóa sản phẩm thất bại"];
        }

    }

    //Tìm kiếm sản phẩm theo tên và theo mô tả
    public function seachProduct($key)
    {
        $query = "SELECT p.id, p.name, p.price, p.description, p.quantity,
        GROUP_CONCAT(DISTINCT cl.name SEPARATOR ', ') as color, p.discount_percent,
        p.thumbnail, c.name AS category_name FROM product p
        LEFT JOIN category c on p.category_id = c.id
        LEFT JOIN product_color pc on p.id = pc.product_id
        LEFT JOIN color cl on pc.color_id = cl.id 
        WHERE p.name LIKE ? 
        OR p.description LIKE ?
        OR MATCH(p.name, p.description) AGAINST (? IN BOOLEAN MODE)
        GROUP BY p.id";
        $stmt = self::$connection->prepare($query);
        $keyword = "%{$key}%";
        $stmt->bind_param("sss", $keyword, $keyword, $keyword);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

}

// $product = new stdClass();

// Gán giá trị cho các thuộc tính của đối tượng
// $product->id = 1;
// $product->name = 'Điện thoại Samsung Galaxy';
// $product->price = 15000000;
// $product->description = 'Điện thoại thông minh với nhiều tính năng nổi bật';
// $product->category_id = 1;
// $product->quantity = 50;
// $product->discount_percent = 10;
// $product->color = ['Đen', 'Trắng', 'Xanh'];
// $product->thumbnail = "ip.jpg";

// $p = new Product_Model();
// print_r($p->updateProduct($product));