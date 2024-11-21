<?php
declare(strict_types=1);

class UserModel extends Database
{

    private $mysqli;

    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->mysqli->prepare("SELECT * FROM user WHERE email = ? LIMIT 1");
        $stmt->bind_param('s', $email);
        $stmt->execute();

        $result = $stmt->get_result();

        $user = $result->fetch_assoc();

        return $user ?: null;
    }

    public function findUserById(int $userId): ?array
    {
        $stmt = $this->mysqli->prepare("SELECT * FROM user WHERE id = ? LIMIT 1");
        $stmt->bind_param('i', $userId);
        $stmt->execute();

        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        return $user ?: null;
    }

    public function emailExists($email)
    {
        $stmt = $this->mysqli->prepare("SELECT * FROM user WHERE email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();

        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    public function createUser(string $email, string $hashedPassword): bool
    {
        // Thực hiện truy vấn để tạo người dùng trong cơ sở dữ liệu
        $role_id = isset($data['role_id']) ? $data['role_id'] : 2;
        $sql = "INSERT INTO user (email, password, role_id) VALUES (?, ?, ?)";
        $stmt = $this->mysqli->prepare($sql);
        $stmt->bind_param("ssi", $email, $hashedPassword, $role_id);
        $stmt->execute();

        // Thực thi truy vấn và kiểm tra kết quả
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }


    public function updatePassword(string $email, string $hashedPassword): bool
    {
        $user = $this->emailExists($email);
        if ($user) {
            $userId = $user['id'];
            $sql = "UPDATE user SET password = ? WHERE id = ?";
            $stmt = $this->mysqli->prepare($sql);
            $stmt->bind_param("si", $hashedPassword, $userId);

            return $stmt->execute();
        }

        return false;
    }

    public function logout()
    {
        session_start();
        session_unset();
        session_destroy();
    }
}
