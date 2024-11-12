<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class DiscountSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * https://book.cakephp.org/phinx/0/en/seeding.html
     */
    public function run(): void
    {
        // Dữ liệu mẫu cho bảng discount
        $data = [
            [
                'code' => 'SALE20',
                'discount_percentage' => 20.00,
                'valid_from' => '2024-01-01 00:00:00',
                'valid_until' => '2024-12-31 23:59:59',
                'max_uses' => 100,
                'time_used' => 0,
                'min_order_value' => 50.00,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'code' => 'NEWYEAR25',
                'discount_percentage' => 25.00,
                'valid_from' => '2024-12-01 00:00:00',
                'valid_until' => '2025-01-31 23:59:59',
                'max_uses' => 50,
                'time_used' => 0,
                'min_order_value' => 75.00,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'code' => 'FREESHIP',
                'discount_percentage' => 0.00,
                'valid_from' => '2024-06-01 00:00:00',
                'valid_until' => '2024-12-31 23:59:59',
                'max_uses' => 200,
                'time_used' => 0,
                'min_order_value' => 30.00,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ];

        // Thêm dữ liệu vào bảng discount
        $discount = $this->table('discount');
        $discount->insert($data)->saveData();
    }
}
