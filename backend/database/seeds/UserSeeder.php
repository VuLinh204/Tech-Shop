<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class UserSeeder extends AbstractSeed
{
    public function run(): void
    {
        // Lấy kết nối đến cơ sở dữ liệu
        $adapter = $this->getAdapter();

        // Select ra data bảng role
        $roles = $adapter->fetchAll('SELECT * FROM role');

        if (empty($roles)) {
            throw new Exception('No roles found. Please seed the roles first.');
        }

        $roleIdAdmin = $roles[0]['id'];
        $roleIdUser = $roles[1]['id'];

        $data = [
            [
                'username' => 'Vũ Linh',
                'email' => 'linhlg2004@gmail.com',
                'phone_number' => '0364704715',
                'address' => 'q Gò Vấp , tp HCM',
                'password' => password_hash('123456@', PASSWORD_BCRYPT),
                'role_id' => $roleIdAdmin,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'username' => 'Nhật Tuấn',
                'email' => 'tuannhat124@gmail.com',
                'phone_number' => '0962256941',
                'address' => '456 User Ave',
                'password' => password_hash('123456@', PASSWORD_BCRYPT),
                'role_id' => $roleIdUser,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'username' => 'Quang Dinh',
                'email' => 'dinhquang295@gmail.com',
                'phone_number' => '0528359104',
                'address' => '456 User Ave',
                'password' => password_hash('123456@', PASSWORD_BCRYPT),
                'role_id' => $roleIdUser,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'username' => 'Công Mến',
                'email' => 'nguyenme123321@gmail.com',
                'phone_number' => '0392974339',
                'address' => '456 User Ave',
                'password' => password_hash('123456@', PASSWORD_BCRYPT),
                'role_id' => $roleIdUser,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'username' => 'Thành Đạt',
                'email' => 'nguyenthanhdat01012k3@gmail.com',
                'phone_number' => '0328436826',
                'address' => '456 User Ave',
                'password' => password_hash('123456@', PASSWORD_BCRYPT),
                'role_id' => $roleIdUser,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ];

        $this->table('user')->insert($data)->saveData();
    }
}
