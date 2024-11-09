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
            'address' => $user['address'],
            'phone_number' => $user['phone_number'],
            'role_id' => $user['role_id']
        ];

        // Đăng nhập thành công, trả về thông tin người dùng
        return [
            'status' => 'success',
            'message' => 'Đăng nhập thành công.',
            'user' => $_SESSION['user']
        ];
    }

    // Phương thức tạo mật khẩu mới sau khi xác thực OTP
    public function createPassword(string $password): array
    {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $_SESSION['user_password'] = $hashedPassword;
        return [
            'success' => true,
            'message' => 'Mật khẩu đã được lưu vào session thành công.'
        ];
    }

    public function createUser(string $email, string $hashedPassword): array
    {
        // Tạo người dùng mới

        if ($this->userModel->emailExists($email)) {
            return [
                'success' => false,
                'errors' => ['Email này đã được đăng ký. Vui lòng đăng nhập hoặc sử dụng email khác.']
            ];
        }
        // Hash lại mật khẩu trước khi lưu vào cơ sở dữ liệu
        $hashedPassword = password_hash($hashedPassword, PASSWORD_DEFAULT);

        $result = $this->userModel->createUser($email, $hashedPassword);

        if ($result) {
            return [
                'success' => true,
                'message' => 'Người dùng đã được tạo thành công.'
            ];
        } else {
            return [
                'success' => false,
                'errors' => ['Có lỗi xảy ra khi tạo người dùng. Vui lòng thử lại.']
            ];
        }
    }

    public function updatePassword(string $email, string $newPassword): array
    {
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);


        $result = $this->userModel->updatePassword($email, $hashedPassword);

        if ($result) {
            return ['success' => true, 'message' => 'Mật khẩu cập nhật thành công.'];
        } else {
            return ['success' => false, 'errors' => ['Mật khẩu cập nhật thất bại.']];
        }
    }
}
