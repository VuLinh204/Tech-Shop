<?php
header("Content-Type: application/json");
require '../config/cors.php';
session_start();
$_SESSION['user_id'] = $userId;
class UserController
{
    private $userModel;

    public function __construct($mysqli)
    {
        $this->userModel = new UserModel($mysqli);
    }

    public function getCurrentUser()
    {
        if (isset($_SESSION['id'])) {
            $userId = $_SESSION['id'];
            $user = $this->userModel->findUserById($userId);

            if ($user) {
                echo json_encode([
                    'status' => 'success',
                    'data' => $user,
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Bạn chưa đăng nhập.',
                ]);
            }
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Bạn chưa đăng nhập.',
            ]);
        }
    }
}
