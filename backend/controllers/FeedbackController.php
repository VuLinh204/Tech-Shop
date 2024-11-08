<?php

class FeedbackController
{
    private $feedbackModel;

    public function __construct($feedbackModel)
    {
        $this->feedbackModel = $feedbackModel;
    }

    // Lấy feedback của sản phẩm
    public function getFeedback($productId)
    {
        return $this->feedbackModel->getFeedbackByProductId($productId);
    }

    // Thêm feedback
    public function addFeedback($userId, $productId, $comment, $rating)
    {
        // Kiểm tra nếu người dùng đã bình luận cho sản phẩm này
        if ($this->feedbackModel->hasUserCommented($userId, $productId)) {
            return false; // Nếu đã bình luận, trả về false
        }

        return $this->feedbackModel->addFeedback($userId, $productId, $comment, $rating);
    }

    // Add the update method to the FeedbackController
    public function updateFeedback($feedbackId, $userId, $comment, $rating)
    {
        return $this->feedbackModel->updateFeedback($feedbackId, $userId, $comment, $rating);
    }

    // Xóa feedback
    public function deleteFeedback($feedbackId)
    {
        return $this->feedbackModel->deleteFeedback($feedbackId);
    }
}
