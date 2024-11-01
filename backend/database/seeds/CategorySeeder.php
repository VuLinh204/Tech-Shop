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
                'name' => 'Electronics',
                'thumbnail' => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MTB8MHwxfGFsbHwxfHx8fHx8fHwxNjQ1OTQ0MDE4&ixlib=rb-1.2.1&q=80&w=400',
            ],
            [
                'name' => 'Laptop',
                'thumbnail' => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MTB8MHwxfGFsbHwxfHx8fHx8fHwxNjQ1OTQ0MDE4&ixlib=rb-1.2.1&q=80&w=400',
            ],
            [
                'name' => 'Smartphone',
                'thumbnail' => 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MTB8MHwxfGFsbHwyfHx8fHx8fHwxNjQ1OTQ0MDE4&ixlib=rb-1.2.1&q=80&w=400',
            ],
            [
                'name' => 'Headphones',
                'thumbnail' => 'https://images.unsplash.com/photo-1511751949116-1ebf0d0efc4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MTB8MHwxfGFsbHwzfHx8fHx8fHwxNjQ1OTQ0MDE4&ixlib=rb-1.2.1&q=80&w=400',
            ],
            [
                'name' => 'Smartwatch',
                'thumbnail' => 'https://images.unsplash.com/photo-1553530981-1c1e935d0210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MTB8MHwxfGFsbHw0fHx8fHx8fHwxNjQ1OTQ0MDE4&ixlib=rb-1.2.1&q=80&w=400',
            ],
            [
                'name' => 'Tablet',
                'thumbnail' => 'https://images.unsplash.com/photo-1541909624-8f8c5d18f3f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MTB8MHwxfGFsbHw1fHx8fHx8fHwxNjQ1OTQ0MDE4&ixlib=rb-1.2.1&q=80&w=400',
            ],
            [
                'name' => 'Camera',
                'thumbnail' => 'https://images.unsplash.com/photo-1522444924-7a4075c5d6b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MTB8MHwxfGFsbHw2fHx8fHx8fHwxNjQ1OTQ0MDE4&ixlib=rb-1.2.1&q=80&w=400',
            ],
            [
                'name' => 'Bluetooth Speaker',
                'thumbnail' => 'https://images.unsplash.com/photo-1525401551288-6b7c1566c93d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MTB8MHwxfGFsbHw3fHx8fHx8fHwxNjQ1OTQ0MDE4&ixlib=rb-1.2.1&q=80&w=400',
            ],
            [
                'name' => 'VR Headset',
                'thumbnail' => 'https://images.unsplash.com/photo-1591293400337-d06c8e01c81d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MTB8MHwxfGFsbHw4fHx8fHx8fHwxNjQ1OTQ0MDE4&ixlib=rb-1.2.1&q=80&w=400',
            ],
            [
                'name' => 'Gaming Console',
                'thumbnail' => 'https://images.unsplash.com/photo-1595122710376-bd00cd3b00e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MTB8MHwxfGFsbHw5fHx8fHx8fHwxNjQ1OTQ0MDE4&ixlib=rb-1.2.1&q=80&w=400',
            ],
            [
                'name' => 'Smart Home Device',
                'thumbnail' => 'https://images.unsplash.com/photo-1580680310585-c6bb0592c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MTB8MHwxfGFsbHwxMHx8fHx8fHx8fHwxNjQ1OTQ0MDE4&ixlib=rb-1.2.1&q=80&w=400',
            ],
        ];

        $table = $this->table('category');
        $table->insert($data)->saveData();
    }
}
