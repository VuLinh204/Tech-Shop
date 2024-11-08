<?php

class FeedbackModel
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  // Lấy tất cả feedback của một sản phẩm
  public function getFeedbackByProductId($productId)
  {
    $query = "SELECT 
    feedback.id,
    user.username AS user_name, 
    feedback.comment,
    feedback.rating,
    feedback.created_at
FROM 
    feedback
JOIN
    user ON feedback.user_id = user.id 
WHERE 
    feedback.product_id = :product_id  ORDER BY
                feedback.created_at DESC";
    $stmt = $this->db->prepare($query);
    $stmt->bindParam(':product_id', $productId, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  // Thêm feedback mới
  public function addFeedback($userId, $productId, $comment, $rating)
  {
    $query = "INSERT INTO feedback (user_id, product_id, comment, rating, created_at) 
                  VALUES (:user_id, :product_id, :comment, :rating, NOW())";
    $stmt = $this->db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->bindParam(':product_id', $productId, PDO::PARAM_INT);
    $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
    $stmt->bindParam(':rating', $rating, PDO::PARAM_INT);
    return $stmt->execute();
  }
  public function updateFeedback($feedbackId, $userId, $comment, $rating)
  {
    $sql = "UPDATE feedback SET comment = :comment, rating = :rating WHERE id = :feedbackId AND user_id = :userId";
    $stmt = $this->db->prepare($sql);
    $stmt->bindParam(':feedbackId', $feedbackId);
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':comment', $comment);
    $stmt->bindParam(':rating', $rating);

    return $stmt->execute();
  }
  // Xóa feedback theo id
  public function deleteFeedback($feedbackId)
  {
    $query = "DELETE FROM feedback WHERE id = :id";
    $stmt = $this->db->prepare($query);
    $stmt->bindParam(':id', $feedbackId, PDO::PARAM_INT);
    return $stmt->execute();
  }
  // Kiểm tra xem người dùng đã bình luận cho sản phẩm này chưa
  public function hasUserCommented($userId, $productId)
  {
    $query = "SELECT COUNT(*) FROM feedback WHERE user_id = :user_id AND product_id = :product_id";
    $stmt = $this->db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->bindParam(':product_id', $productId, PDO::PARAM_INT);
    $stmt->execute();
    $count = $stmt->fetchColumn();
    return $count > 0; // Nếu có bình luận trả về true, ngược lại false
  }
}
