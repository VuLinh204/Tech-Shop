<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateGalleryTable extends AbstractMigration
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
        $table = $this->table('gallery');

        $table->addColumn('thumbnail', 'string', ['limit' => 500, 'null' => false])
            ->addColumn('product_id', 'integer', ['null' => false, 'signed' => false])
            ->addForeignKey('product_id', 'product', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->addTimestamps()
            ->create();
    }
}
