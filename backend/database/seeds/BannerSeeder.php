<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class BannerSeeder extends AbstractSeed
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
                'title' => 'Banner 1',
                'image_url' => 'banner1.jpg',
                'link' => 'https://example.com/page1',  
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'title' => 'Banner 2',
                'image_url' => 'banner2.jpg',
                'link' => 'https://example.com/page2',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'title' => 'Banner 3',
                'image_url' => 'banner3.jpg',
                'link' => 'https://example.com/page3',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ];

        $this->table('banners')->insert($data)->save();
    }
}
