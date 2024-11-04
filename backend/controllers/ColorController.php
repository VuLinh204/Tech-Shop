<?php
require_once '../models/ColorModel.php';

class ColorController
{
    private $colorModel;

    public function __construct()
    {
        $this->colorModel = new ColorModel();
    }

    public function getAllColors()
    {
        return $this->colorModel->fetchAllColors();
    }
}
