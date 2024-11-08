<?php
session_start();
require_once '../controllers/LogoutController.php';

$logoutController = new LogoutController();
$logoutController->logout();
