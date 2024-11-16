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
                'description' => 'Điện thoại iPhone 14 với công nghệ mới nhất.',
                'discount_percent' => '25',
                'thumbnail' => 'Iphone14.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'MacBook Pro 16"',
                'price' => 2399.99,
                'description' => 'Laptop MacBook Pro 16 inch, hiệu năng mạnh mẽ.',
                'discount_percent' => '35',
                'thumbnail' => 'Laptop-MacBook-Pro16.png',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Tai nghe không dây',
                'price' => 149.99,
                'description' => 'Phụ kiện tai nghe không dây chất lượng cao.',
                'discount_percent' => '40',
                'thumbnail' => 'Tai-nghe-không-dây.png',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Samsung Galaxy S23',
                'price' => 899.99,
                'description' => 'Điện thoại Samsung Galaxy S23, thiết kế sang trọng.',
                'discount_percent' => '67',
                'thumbnail' => 'Samsung-Galaxy-TabS8.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Sony WH-1000XM5',
                'price' => 349.99,
                'description' => 'Tai nghe Sony WH-1000XM5, chống ồn chủ động.',
                'discount_percent' => '56',
                'thumbnail' => 'Sony-WH-1000XM5.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'iPad Pro 11"',
                'price' => 799.99,
                'description' => 'Máy tính bảng iPad Pro 11 inch, hiệu năng cao.',
                'discount_percent' => '34',
                'thumbnail' => 'iPad-Pro11.png',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'LG OLED TV 55"',
                'price' => 1499.99,
                'description' => 'TV OLED LG 55 inch, hình ảnh sắc nét.',
                'thumbnail' => 'LG-OLED-TV55.png',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Apple Watch Series 8',
                'price' => 399.99,
                'description' => 'Đồng hồ thông minh Apple Watch Series 8.',
                'thumbnail' => 'Apple-Watch-Series8.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'GoPro HERO10',
                'price' => 499.99,
                'description' => 'Camera hành động GoPro HERO10, chống nước.',
                'thumbnail' => 'GoPro-HERO10.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Dell XPS 13',
                'price' => 1299.99,
                'description' => 'Laptop Dell XPS 13, thiết kế mỏng nhẹ.',
                'thumbnail' => 'Dell-XPS13.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'iPhone 14 Pro Max',
                'price' => 1099.99,
                'description' => 'Điện thoại iPhone 14 Pro Max với camera chất lượng cao.',
                'thumbnail' => 'iPhone-14Pro-Max.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Mac Mini M1',
                'price' => 699.99,
                'description' => 'Máy tính để bàn Mac Mini với chip M1 mạnh mẽ.',
                'thumbnail' => 'Mac-Mini-M1.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Apple Pencil (2nd Gen)',
                'price' => 129.99,
                'description' => 'Bút cảm ứng Apple Pencil thế hệ thứ hai cho iPad.',
                'thumbnail' => 'Apple-Pencil.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Samsung Galaxy Tab S8',
                'price' => 699.99,
                'description' => 'Máy tính bảng Samsung Galaxy Tab S8 với màn hình đẹp.',
                'thumbnail' => 'Samsung-Galaxy-TabS8.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Fujifilm X-T4',
                'price' => 1699.99,
                'description' => 'Máy ảnh Fujifilm X-T4 với khả năng chụp ảnh chuyên nghiệp.',
                'thumbnail' => 'Fujifilm-X-T4.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Razer Blade 15',
                'price' => 1999.99,
                'description' => 'Laptop gaming Razer Blade 15 với hiệu năng cao.',
                'thumbnail' => 'Razer-Blade15.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Nintendo Switch',
                'price' => 299.99,
                'description' => 'Máy chơi game Nintendo Switch với nhiều trò chơi thú vị.',
                'thumbnail' => 'Nintendo-Switch.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Bose SoundLink II',
                'price' => 199.99,
                'description' => 'Loa Bluetooth Bose SoundLink II với âm thanh tuyệt vời.',
                'thumbnail' => 'Bose-SoundLinkII.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Microsoft Surface Pro 8',
                'price' => 999.99,
                'description' => 'Máy tính bảng Microsoft Surface Pro 8 với hiệu năng mạnh.',
                'thumbnail' => 'Microsoft-Surface-Pro8.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Fitbit Charge 5',
                'price' => 149.99,
                'description' => 'Đồng hồ thể thao Fitbit Charge 5 với tính năng theo dõi sức khỏe.',
                'thumbnail' => 'Fitbit-Charge5.jpg',
                'category_id' => rand(1, 10), // Category ID from 1 to 10
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ];

        // Kiểm tra và thêm dữ liệu vào bảng product
        $productTable = $this->table('product');
        $productTable->insert($data)->saveData();
    }
}
