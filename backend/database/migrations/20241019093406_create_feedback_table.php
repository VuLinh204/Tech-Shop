<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateFeedbackTable extends AbstractMigration
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
        $table = $this->table('feedback');
        $table->addColumn('user_id', 'integer', ['null' => false, 'signed' => false])
            ->addForeignKey('user_id', 'user', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->addColumn('product_id', 'integer', ['null' => false, 'signed' => false])
            ->addForeignKey('product_id', 'product', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->addColumn('comment', 'text', ['null' => false])
            ->addColumn('rating', 'integer', ['limit' => 6, 'null' => false])
            ->addColumn('parent_id', 'integer', ['null' => true, 'signed' => false, 'default' => null]) // Bình luận cha
            ->addForeignKey('parent_id', 'feedback', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->addTimestamps()
            ->create();
    }
}
