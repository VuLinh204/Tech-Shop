<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateProductsTable extends AbstractMigration
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
        $table = $this->table('product');
        $table->addColumn('name', 'string', ['limit' => 255, 'null' => false])
            ->addColumn('price', 'decimal', ['precision' => 10, 'scale' => 0, 'null' => false])
            ->addColumn('quantity', 'integer', ['null' => false, 'default' => 0, 'signed' => false])
            ->addColumn('description', 'text', ['null' => false])
            ->addColumn('discount_percent', 'integer', ['null' => false, 'default' => 0])
            ->addColumn('thumbnail', 'string', ['limit' => 255, 'null' => false])
            ->addColumn('category_id', 'integer', ['null' => false, 'signed' => false])
            ->addForeignKey('category_id', 'category', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->addColumn('deleted_at', 'timestamp', ['default' => null, 'null' => true])
            ->addTimestamps()
            ->create();

        // Thêm chỉ mục FULLTEXT cho cột 'name' và 'description'
        $this->execute("ALTER TABLE product ADD FULLTEXT(name, description)");
    }
}
