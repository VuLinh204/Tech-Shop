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
                'price' => 9990000,
                'description' => 'Điện thoại iPhone 14 với công nghệ mới nhất.',
                'discount_percent' => '25',
                'thumbnail' => 'Iphone14.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'MacBook Pro 16" ',
                'price' => 23990000,
                'description' => 'Laptop MacBook Pro 16 inch, hiệu năng mạnh mẽ.',
                'discount_percent' => '35',
                'thumbnail' => 'Laptop-MacBook-Pro16.png',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Tai nghe không dây',
                'price' => 1490000,
                'description' => 'Phụ kiện tai nghe không dây chất lượng cao.',
                'discount_percent' => '40',
                'thumbnail' => 'Tai-nghe-không-dây.png',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Samsung Galaxy S23',
                'price' => 8990000,
                'description' => 'Điện thoại Samsung Galaxy S23, thiết kế sang trọng.',
                'discount_percent' => '67',
                'thumbnail' => 'Samsung-Galaxy-TabS8.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Sony WH-1000XM5',
                'price' => 3490000,
                'description' => 'Tai nghe Sony WH-1000XM5, chống ồn chủ động.',
                'discount_percent' => '56',
                'thumbnail' => 'Sony WH-1000XM5.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'iPad Pro 11" ',
                'price' => 7990000,
                'description' => 'Máy tính bảng iPad Pro 11 inch, hiệu năng cao.',
                'discount_percent' => '34',
                'thumbnail' => 'iPad-Pro11.png',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'LG OLED TV 55" ',
                'price' => 14990000,
                'description' => 'TV OLED LG 55 inch, hình ảnh sắc nét.',
                'thumbnail' => 'LG-OLED-TV55.png',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Apple Watch Series 8',
                'price' => 3990000,
                'description' => 'Đồng hồ thông minh Apple Watch Series 8.',
                'thumbnail' => 'Apple Watch Series 8.png',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'GoPro HERO10',
                'price' => 4990000,
                'description' => 'Camera hành động GoPro HERO10, chống nước.',
                'thumbnail' => 'GoPro-HERO10.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Dell XPS 13',
                'price' => 12990000,
                'description' => 'Laptop Dell XPS 13, thiết kế mỏng nhẹ.',
                'thumbnail' => 'Dell-XPS13.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'iPhone 14 Pro Max',
                'price' => 10990000,
                'description' => 'Điện thoại iPhone 14 Pro Max với camera chất lượng cao.',
                'thumbnail' => 'iPhone-14Pro-Max.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Mac Mini M1',
                'price' => 6990000,
                'description' => 'Máy tính để bàn Mac Mini với chip M1 mạnh mẽ.',
                'thumbnail' => 'Mac-Mini-M1.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Apple Pencil (2nd Gen)',
                'price' => 1290000,
                'description' => 'Bút cảm ứng Apple Pencil thế hệ thứ hai cho iPad.',
                'thumbnail' => 'Apple-Pencil.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Samsung Galaxy Tab S8',
                'price' => 6990000,
                'description' => 'Máy tính bảng Samsung Galaxy Tab S8 với màn hình đẹp.',
                'thumbnail' => 'Samsung-Galaxy-TabS8.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Google Pixel 7',
                'price' => 5990000,
                'description' => 'Điện thoại Google Pixel 7 với camera chất lượng cao.',
                'thumbnail' => 'Google Pixel 7.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Fujifilm X-T4',
                'price' => 16990000,
                'description' => 'Máy ảnh Fujifilm X-T4 với khả năng chụp ảnh chuyên nghiệp.',
                'thumbnail' => 'Fujifilm-X-T4.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Razer Blade 15',
                'price' => 19990000,
                'description' => 'Laptop gaming Razer Blade 15 với hiệu năng cao.',
                'thumbnail' => 'Razer-Blade15.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Nintendo Switch',
                'price' => 2990000,
                'description' => 'Máy chơi game Nintendo Switch với nhiều trò chơi thú vị.',
                'thumbnail' => 'Nintendo-Switch.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Bose SoundLink II',
                'price' => 1990000,
                'description' => 'Loa Bluetooth Bose SoundLink II với âm thanh tuyệt vời.',
                'thumbnail' => 'Bose SoundLink II.png',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Microsoft Surface Pro 8',
                'price' => 9990000,
                'description' => 'Máy tính bảng Microsoft Surface Pro 8 với hiệu năng mạnh.',
                'thumbnail' => 'Microsoft Surface Pro 8.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Fitbit Charge 5',
                'price' => 1490000,
                'description' => 'Đồng hồ thể thao Fitbit Charge 5 với tính năng theo dõi sức khỏe.',
                'thumbnail' => 'Fitbit Charge 5.jpg',
                'category_id' => rand(1, 10),
                'quantity' => rand(1, 100),
                'updated_at' => date('Y-m-d H:i:s')
            ],

            [
                "name" => "Laptop Dell Inspiron 15",
                "price" => 15000000,
                "category_id" => 11,
                "description" => "Laptop Dell với cấu hình mạnh mẽ, màn hình 15.6 inch, lý tưởng cho học tập và công việc.",
                "thumbnail" => "Laptop Dell Inspiron 15.jpg"
            ],
            [
                "name" => "Smartphone Samsung Galaxy S23",
                "price" => 20000000,
                "category_id" => 12,
                "description" => "Điện thoại thông minh Samsung Galaxy S23 với camera 50MP, màn hình AMOLED 120Hz.",
                "thumbnail" => "Smartphone Samsung Galaxy S23.jpg"
            ],
            [
                "name" => "Máy tính bàn HP Pavilion",
                "price" => 12000000,
                "category_id" => 13,
                "description" => "Máy tính bàn HP Pavilion với bộ vi xử lý Intel Core i5, thích hợp cho văn phòng và giải trí.",
                "thumbnail" => "Máy tính bàn HP Pavilion.jpg"
            ],
            [
                "name" => "Tai nghe Sony WH-1000XM5",
                "price" => 8000000,
                "category_id" => 14,
                "description" => "Tai nghe chống ồn Sony WH-1000XM5, âm thanh tuyệt vời, pin lâu dài.",
                "thumbnail" => "Tai nghe Sony WH-1000XM5.jpg"
            ],
            [
                "name" => "Máy chiếu Epson EB-X41",
                "price" => 11000000,
                "category_id" => 15,
                "description" => "Máy chiếu Epson EB-X41 với độ sáng cao, chất lượng hình ảnh sắc nét.",
                "thumbnail" => "Máy chiếu Epson EB-X41.jpg"
            ],
            [
                "name" => "Màn hình LG 27 inch",
                "price" => 6000000,
                "category_id" => 16,
                "description" => "Màn hình LG 27 inch, độ phân giải Full HD, phù hợp cho công việc và giải trí.",
                "thumbnail" => "Màn hình LG 27 inch.jpg"
            ],
            [
                "name" => "Máy in Canon Pixma G3020",
                "price" => 4500000,
                "category_id" => 17,
                "description" => "Máy in Canon Pixma G3020, in nhanh, hiệu quả, phù hợp cho văn phòng.",
                "thumbnail" => "Máy in Canon Pixma G3020.jpg"
            ],
            [
                "name" => "Loa Bluetooth JBL Charge 5",
                "price" => 5500000,
                "category_id" => 18,
                "description" => "Loa Bluetooth JBL Charge 5, âm thanh sống động, chống nước, pin lâu dài.",
                "thumbnail" => "Loa Bluetooth JBL Charge 5.jpg"
            ],
            [
                "name" => "Máy lạnh Panasonic 1.5HP",
                "price" => 9000000,
                "category_id" => 19,
                "description" => "Máy lạnh Panasonic 1.5HP, tiết kiệm điện, làm lạnh nhanh.",
                "thumbnail" => "Máy lạnh Panasonic 1.5HP.jpg"
            ],
            [
                "name" => "Tủ lạnh Samsung 250L",
                "price" => 7000000,
                "category_id" => 20,
                "description" => "Tủ lạnh Samsung 250L, thiết kế hiện đại, tiết kiệm năng lượng.",
                "thumbnail" => "Tủ lạnh Samsung 250L.jpg"
            ],
            [
                "name" => "Máy giặt LG Inverter 8kg",
                "price" => 6500000,
                "category_id" => 11,
                "description" => "Máy giặt LG Inverter 8kg, giặt sạch hiệu quả, tiết kiệm điện.",
                "thumbnail" => "Máy giặt LG Inverter 8kg.jpg"
            ],
            [
                "name" => "Nồi cơm điện Panasonic 1L",
                "price" => 1200000,
                "category_id" => 12,
                "description" => "Nồi cơm điện Panasonic 1L, tiện lợi, chế biến cơm ngon.",
                "thumbnail" => "Nồi cơm điện Panasonic 1L.jpg"
            ],
            [
                "name" => "Bàn phím cơ Logitech G Pro X",
                "price" => 2000000,
                "category_id" => 13,
                "description" => "Bàn phím cơ Logitech G Pro X, công nghệ Blue Switch, tốc độ phản hồi cực nhanh.",
                "thumbnail" => "Bàn phím cơ Logitech G Pro X.jpg"
            ],
            [
                "name" => "Chuột gaming Razer DeathAdder V2",
                "price" => 1500000,
                "category_id" => 14,
                "description" => "Chuột gaming Razer DeathAdder V2, thiết kế ergonomic, cảm biến quang học chính xác.",
                "thumbnail" => "Chuột gaming Razer DeathAdder V2.jpg"
            ],
            [
                "name" => "Ổ cứng di động Seagate 1TB",
                "price" => 1200000,
                "category_id" => 15,
                "description" => "Ổ cứng di động Seagate 1TB, dung lượng lớn, tốc độ đọc ghi nhanh.",
                "thumbnail" => "Ổ cứng di động Seagate 1TB.jpg"
            ],
            [
                "name" => "Vỏ máy tính NZXT H510",
                "price" => 3000000,
                "category_id" => 16,
                "description" => "Vỏ máy tính NZXT H510, thiết kế tối giản, làm mát hiệu quả.",
                "thumbnail" => "Vỏ máy tính NZXT H510.jpg"
            ],
            [
                "name" => "Máy lọc không khí Xiaomi Mi Air Purifier 3H",
                "price" => 3500000,
                "category_id" => 17,
                "description" => "Máy lọc không khí Xiaomi Mi Air Purifier 3H, lọc bụi mịn hiệu quả.",
                "thumbnail" => "Máy lọc không khí Xiaomi Mi Air Purifier 3H.jpg"
            ],
            [
                "name" => "Robot hút bụi Xiaomi Roborock S7",
                "price" => 8000000,
                "category_id" => 18,
                "description" => "Robot hút bụi Xiaomi Roborock S7, làm sạch tự động, công nghệ sóng âm.",
                "thumbnail" => "Robot hút bụi Xiaomi Roborock S7.jpg"
            ],
            [
                "name" => "Máy xay sinh tố Philips HR3652/00",
                "price" => 1500000,
                "category_id" => 19,
                "description" => "Máy xay sinh tố Philips HR3652/00, công suất mạnh mẽ, dễ sử dụng.",
                "thumbnail" => "Máy xay sinh tố Philips HR3652/00.jpg"
            ],
            [
                "name" => "Máy sấy tóc Dyson Supersonic",
                "price" => 6000000,
                "category_id" => 20,
                "description" => "Máy sấy tóc Dyson Supersonic, công nghệ sấy nhanh, bảo vệ tóc.",
                "thumbnail" => "Máy sấy tóc Dyson Supersonic.jpg"
            ],
            [
                "name" => "Tủ đồ thông minh Xiaomi",
                "price" => 5000000,
                "category_id" => 21,
                "description" => "Tủ đồ thông minh Xiaomi, thiết kế hiện đại, tiết kiệm không gian.",
                "thumbnail" => "Tủ đồ thông minh Xiaomi.jpg"
            ],
            [
                "name" => "Nồi áp suất điện Philips HD2137",
                "price" => 3000000,
                "category_id" => 11,
                "description" => "Nồi áp suất điện Philips HD2137, giúp nấu ăn nhanh chóng và tiết kiệm năng lượng.",
                "thumbnail" => "Nồi áp suất điện Philips HD2137.jpg"
            ],
            [
                "name" => "Đèn bàn LED Xiaomi Mi",
                "price" => 800000,
                "category_id" => 12,
                "description" => "Đèn bàn LED Xiaomi Mi, ánh sáng dịu nhẹ, bảo vệ mắt.",
                "thumbnail" => "Đèn bàn LED Xiaomi Mi.jpg"
            ],
            [
                "name" => "Bình giữ nhiệt Thermos",
                "price" => 500000,
                "category_id" => 13,
                "description" => "Bình giữ nhiệt Thermos, giữ nhiệt lâu, tiện lợi cho mọi hoạt động.",
                "thumbnail" => "Bình giữ nhiệt Thermos.jpg"
            ],
            [
                "name" => "Máy pha cà phê DeLonghi",
                "price" => 4500000,
                "category_id" => 14,
                "description" => "Máy pha cà phê DeLonghi, pha cà phê chuyên nghiệp, tiện dụng.",
                "thumbnail" => "Máy pha cà phê DeLonghi.jpg"
            ],
            [
                "name" => "Đồng hồ thông minh Apple Watch Series 8",
                "price" => 10000000,
                "category_id" => 15,
                "description" => "Đồng hồ thông minh Apple Watch Series 8, theo dõi sức khỏe và thể thao chính xác.",
                "thumbnail" => "Đồng hồ thông minh Apple Watch Series 8.jpg"
            ],
            [
                "name" => "Áo khoác Nike Windrunner",
                "price" => 1200000,
                "category_id" => 16,
                "description" => "Áo khoác Nike Windrunner, chất liệu chống gió, thiết kế thể thao.",
                "thumbnail" => "Áo khoác Nike Windrunner.jpg"
            ]
        ];

        // Kiểm tra và thêm dữ liệu vào bảng product
        $productTable = $this->table('product');
        $productTable->insert($data)->saveData();
    }
}
