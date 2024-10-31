<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class ProductColorSeeder extends AbstractSeed
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
        $data = [
            [
                'product_id' => 1, // iPhone 14
                'color_id' => 1    // Đen
            ],
            [
                'product_id' => 1, // iPhone 14
                'color_id' => 2    // Trắng
            ],
            [
                'product_id' => 2, // MacBook Pro 16"
                'color_id' => 1    // Đen
            ],
            [
                'product_id' => 2, // MacBook Pro 16"
                'color_id' => 3    // Đỏ
            ],
        ];

        // Thêm dữ liệu vào bảng `product_color`
        $productColorTable = $this->table('product_color');
        $productColorTable->insert($data)->saveData();
    }
}
