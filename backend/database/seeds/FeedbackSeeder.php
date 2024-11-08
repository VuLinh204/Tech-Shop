<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class FeedbackSeeder extends AbstractSeed
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
                'user_id' => 1,
                'product_id' => 1,
                'comment' => 'Sản phẩm rất tốt, chất lượng vượt trội!',
                'rating' => 5,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'user_id' => 2,
                'product_id' => 2,
                'comment' => 'Giá hơi cao nhưng chất lượng thì tuyệt vời.',
                'rating' => 4,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'user_id' => 1,
                'product_id' => 3,
                'comment' => 'Sản phẩm không như mong đợi, cần cải thiện.',
                'rating' => 2,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];

        // Chèn dữ liệu vào bảng feedback
        $this->table('feedback')->insert($data)->saveData();
    }
}
