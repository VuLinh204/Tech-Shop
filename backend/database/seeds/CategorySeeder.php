<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class CategorySeeder extends AbstractSeed
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
                'name' => 'Thiết bị điện tử',
                'thumbnail' => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Máy tính xách tay',
                'thumbnail' => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Điện thoại thông minh',
                'thumbnail' => 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Tai nghe không dây',
                'thumbnail' => 'https://images.unsplash.com/photo-1511751949116-1ebf0d0efc4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Đồng hồ thông minh',
                'thumbnail' => 'https://images.unsplash.com/photo-1553530981-1c1e935d0210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Máy tính bảng',
                'thumbnail' => 'https://images.unsplash.com/photo-1541909624-8f8c5d18f3f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Máy ảnh',
                'thumbnail' => 'https://images.unsplash.com/photo-1522444924-7a4075c5d6b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Loa Bluetooth',
                'thumbnail' => 'https://images.unsplash.com/photo-1525401551288-6b7c1566c93d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Kính thực tế ảo',
                'thumbnail' => 'https://images.unsplash.com/photo-1591293400337-d06c8e01c81d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Máy chơi game',
                'thumbnail' => 'https://images.unsplash.com/photo-1595122710376-bd00cd3b00e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Thiết bị nhà thông minh',
                'thumbnail' => 'https://images.unsplash.com/photo-1580680310585-c6bb0592c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Máy bay không người lái',
                'thumbnail' => 'https://images.unsplash.com/photo-1512034400317-de97d6ed9edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Thiết bị theo dõi sức khỏe',
                'thumbnail' => 'https://images.unsplash.com/photo-1594824476969-812b13a8f8a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Máy in 3D',
                'thumbnail' => 'https://images.unsplash.com/photo-1557991280-ddd90dcdafbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Bóng đèn thông minh',
                'thumbnail' => 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Sạc di động',
                'thumbnail' => 'https://images.unsplash.com/photo-1532296074113-6a369dd35c3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Máy chiếu',
                'thumbnail' => 'https://images.unsplash.com/photo-1589932219743-d8d89e35f2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Robot hút bụi',
                'thumbnail' => 'https://images.unsplash.com/photo-1622202356537-bb1b053dc602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Ống kính máy ảnh kỹ thuật số',
                'thumbnail' => 'https://images.unsplash.com/photo-1593642531955-b62e31068e22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Camera hành động',
                'thumbnail' => 'https://images.unsplash.com/photo-1580981383523-5bbff6d6c7e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
            [
                'name' => 'Máy đọc sách',
                'thumbnail' => 'https://images.unsplash.com/photo-1496814987603-46c2a9b16fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            ],
        ];

        $table = $this->table('category');
        $table->insert($data)->saveData();
    }
}
