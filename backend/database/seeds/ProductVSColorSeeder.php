<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class ProductVSColorSeeder extends AbstractSeed
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
        // Danh sách các mã màu có sẵn
        $availableColors = [1, 2, 3, 4, 5];
        $data = [];

        // Lặp qua từng sản phẩm với id từ 1 đến 20
        for ($productId = 1; $productId <= 20; $productId++) {
            // Tạo số lượng màu ngẫu nhiên (từ 2 đến 4) cho mỗi sản phẩm
            $colorCount = rand(2, 4);
            // Chọn ngẫu nhiên các mã màu không bị trùng lặp
            $selectedColors = array_rand(array_flip($availableColors), $colorCount);

            // Thêm từng mã màu vào mảng dữ liệu cho sản phẩm hiện tại
            foreach ((array) $selectedColors as $colorId) {
                $data[] = [
                    'product_id' => $productId,
                    'color_id' => $colorId,
                ];
            }
        }

        // Thêm dữ liệu vào bảng `product_color`
        $productColorTable = $this->table('product_color');
        $productColorTable->insert($data)->saveData();
    }
}
