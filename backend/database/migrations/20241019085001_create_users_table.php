<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateUsersTable extends AbstractMigration
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
        $table = $this->table('user');
        $table->addColumn('username', 'string', ['limit' => 255, 'null' => false])
            ->addColumn('email', 'string', ['limit' => 255, 'null' => true])
            ->addIndex(['email'], ['unique' => true])
            ->addColumn('phone_number', 'string', ['limit' => 15, 'null' => false])
            ->addColumn('address', 'string', ['limit' => 500, 'null' => false])
            ->addColumn('profile_picture', 'string', ['limit' => 255, 'null' => true, 'default' => null])
            ->addColumn('password', 'string', ['limit' => 255, 'null' => false])
            ->addColumn('role_id', 'integer', ['null' => false, 'signed' => false])
            ->addForeignKey('role_id', 'role', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->addColumn('deleted_at', 'timestamp', ['default' => null, 'null' => true])
            ->addTimestamps()
            ->create();
    }
}
