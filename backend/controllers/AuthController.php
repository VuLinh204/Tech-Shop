<?php

declare(strict_types=1);

class AuthController
{
    private UserModel $userModel;

    public function __construct(UserModel $userModel)
    {
        $this->userModel = $userModel;
    }

    // Phương thức đăng nhập
    public function login(array $data): array
    {
        // Kiểm tra dữ liệu đầu vào
        if (empty($data['email']) || empty($data['password'])) {
            return [
                'status' => 'error',
                'message' => 'Email và mật khẩu không được để trống.'
            ];
        }

        // Tìm người dùng theo email
        $user = $this->userModel->findByEmail($data['email']);

        if (!$user) {
            return [
                'status' => 'error',
                'message' => 'Người dùng không tồn tại.'
            ];
        }

        // Kiểm tra mật khẩu
        if (!password_verify($data['password'], $user['password'])) {
            return [
                'status' => 'error',
                'message' => 'Mật khẩu không chính xác.'
            ];
        }


        session_start();
        $_SESSION['user'] = [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'phone_number' => $user['phone_number'],
            'address' => $user['address'],
            'password' => $user['password'],
            'role_id' => $user['role_id']
        ];

        // Đăng nhập thành công, trả về thông tin người dùng
        return [
            'status' => 'success',
            'message' => 'Đăng nhập thành công.',
            'user' => $_SESSION['user']
        ];
    }
}
