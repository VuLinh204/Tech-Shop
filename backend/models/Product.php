<?php
class Product
{
    private $id, $name, $price, $description, $color, $quantity, $thumbnail, $discount_percent, $category_id;

    function __construct($id, $name, $price, $description, $color, $quantity, $thumbnail, $discount_percent, $category_id)
    {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->description = $description;
        $this->color = $color;
        $this->quantity = $quantity;
        $this->thumbnail = $thumbnail;
        $this->discount_percent = $discount_percent;
        $this->category_id = $category_id;
    }

    // Getter cho các thuộc tính
    public function getId()
    {
        return $this->id;
    }
    public function getName()
    {
        return $this->name;
    }
    public function getPrice()
    {
        return $this->price;
    }
    public function getDescription()
    {
        return $this->description;
    }
    public function getColor()
    {
        return $this->color;
    }
    public function getQuantity()
    {
        return $this->quantity;
    }
    public function getThumbnail()
    {
        return $this->thumbnail;
    }
    public function getDiscountPercent()
    {
        return $this->discount_percent;
    }
    public function getCategoryId()
    {
        return $this->category_id;
    }
}