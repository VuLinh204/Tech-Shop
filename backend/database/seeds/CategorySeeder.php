<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class CategorySeeder extends AbstractSeed
{
    public function run(): void
    {
        $data = [
            [
                'name' => 'Thiết bị điện tử',
                'thumbnail' => 'Thiet_bi_dien_tu.jpg',
            ],
            [
                'name' => 'Máy tính xách tay',
                'thumbnail' => 'may-tinh-xach-tay.jpg',
            ],
            [
                'name' => 'Điện thoại thông minh',
                'thumbnail' => 'dien-thoai-thong-minh.jpg',
            ],
            [
                'name' => 'Tai nghe không dây',
                'thumbnail' => 'tai-nghe-khong-day.jpg',
            ],
            [
                'name' => 'Đồng hồ thông minh',
                'thumbnail' => 'dong-ho-thong-minh.jpg',
            ],
            [
                'name' => 'Máy tính bảng',
                'thumbnail' => 'may-tinh-bang.jpg',
            ],
            [
                'name' => 'Máy ảnh',
                'thumbnail' => 'may-anh.jpg',
            ],
            [
                'name' => 'Loa Bluetooth',
                'thumbnail' => 'loa-bluetooth.png',
            ],
            [
                'name' => 'Kính thực tế ảo',
                'thumbnail' => 'Kinh-thuc-te-ao.png',
            ],
            [
                'name' => 'Máy chơi game',
                'thumbnail' => 'may-choi-game.jpg',
            ],
            [
                'name' => 'Thiết bị nhà thông minh',
                'thumbnail' => 'thiet-bi-thong-minh.png',
            ],
            [
                'name' => 'Máy bay không người lái',
                'thumbnail' => 'may-bay-khong-nguoi-lai.png',
            ],
            [
                'name' => 'Thiết bị theo dõi sức khỏe',
                'thumbnail' => 'thiet-bi-theo-doi-suc-khoe.jpg',
            ],
            [
                'name' => 'Máy in 3D',
                'thumbnail' => 'may-in-3d.png',
            ],
            [
                'name' => 'Bóng đèn thông minh',
                'thumbnail' => 'bong-den-led-thong-minh.jpg',
            ],
            [
                'name' => 'Sạc di động',
                'thumbnail' => 'sac-di-dong.jpg',
            ],
            [
                'name' => 'Máy chiếu',
                'thumbnail' => 'may-chieu.jpg',
            ],
            [
                'name' => 'Robot hút bụi',
                'thumbnail' => 'may-hut-bui.png',
            ],
            [
                'name' => 'Ống kính máy ảnh kỹ thuật số',
                'thumbnail' => 'ong-kinh-ky-thuat-so.jpg',
            ],
            [
                'name' => 'Camera hành động',
                'thumbnail' => 'camera-hanh-dong.jpg',
            ],
            [
                'name' => 'Máy đọc sách',
                'thumbnail' => 'may-doc-sach.png',
            ],
        ];

        $table = $this->table('category');
        $table->insert($data)->saveData();
    }
}
