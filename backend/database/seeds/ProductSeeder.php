<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class ProductSeeder extends AbstractSeed
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
        // Seed dữ liệu cho sản phẩm
        $data = [
            [
                'name' => 'iPhone 14',
                'price' => 999.99,
                'quantity' => 30,
                'discount_percent' => 10,
                'description' => 'Điện thoại iPhone 14 với công nghệ mới nhất.',
                'thumbnail' => 'iphone14_thumbnail.jpg',
                'category_id' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'MacBook Pro 16"',
                'price' => 2399.99,
                'quantity' => 50,
                'discount_percent' => 5,
                'description' => 'Laptop MacBook Pro 16 inch, hiệu năng mạnh mẽ.',
                'thumbnail' => 'macbookpro16_thumbnail.jpg',
                'category_id' => 2,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Tai nghe không dây',
                'price' => 149.99,
                'quantity' => 70,
                'discount_percent' => 15,
                'description' => 'Phụ kiện tai nghe không dây chất lượng cao.',
                'thumbnail' => 'wireless_headphones_thumbnail.jpg',
                'category_id' => 3,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ];

        // Kiểm tra và thêm dữ liệu vào bảng product
        $productTable = $this->table('product');
        $productTable->insert($data)->saveData();
    }
}
