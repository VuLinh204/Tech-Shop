<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateDiscountTable extends AbstractMigration
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
        $table = $this->table('discount');
        $table->addColumn('code', 'string', ['limit' => 255, 'null' => false])
            ->addColumn('discount_percentage', 'decimal', ['precision' => 5, 'scale' => 2, 'null' => false])
            // ngày bắt đầu có hiệu lực
            ->addColumn('valid_from', 'datetime')
            // (ngày kết thúc giảm giá)
            ->addColumn('valid_until', 'datetime')
            //số lần tối đa có thể sử dụng mã
            ->addColumn('max_uses', 'integer')
            // số lần mã đã sử dụng, mặc định là 0
            ->addColumn('time_used', 'integer', ['default' => 0])
            // Thêm cột min_order_value (giá trị đơn hàng tối thiểu)
            ->addColumn('min_order_value', 'decimal', ['precision' => 10, 'scale' => 2])
            ->addTimestamps()
            // Tạo bảng
            ->create();
    }
}
