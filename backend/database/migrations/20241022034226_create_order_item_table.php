<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateOrderItemTable extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change(): void
    {
        $table = $this->table('order_item');
        $table
            ->addColumn('order_id', 'integer', ['null' => false, 'signed' => false])
            ->addForeignKey('order_id', 'order', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->addColumn('product_id', 'integer', ['null' => false, 'signed' => false])
            ->addForeignKey('product_id', 'product', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->addColumn('price', 'decimal', ['precision' => 10, 'scale' => 0, 'null' => false])
            ->addColumn('num', 'integer', ['null' => false])
            ->create();
    }
}
