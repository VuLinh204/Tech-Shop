<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateOrderTable extends AbstractMigration
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
        $table = $this->table('order');
        $table
            ->addColumn('user_id', 'integer', ['null' => false, 'signed' => false])
            ->addForeignKey('user_id', 'user', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->addColumn('order_date', 'datetime', ['null' => false, 'default' => 'CURRENT_TIMESTAMP'])
            ->addColumn('status', 'integer', ['limit' => 10])
            ->addColumn('discount_id', 'integer', ['null' => true, 'signed' => false])
            ->addForeignKey('discount_id', 'discount', 'id', ['delete' => 'SET_NULL', 'update' => 'NO_ACTION'])
            ->addTimestamps()
            ->create();
    }
}
