<?php

declare(strict_types=1);

class UserModel
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

    public function logout()
    {
        session_start();
        session_unset();
        session_destroy();
    }
}
