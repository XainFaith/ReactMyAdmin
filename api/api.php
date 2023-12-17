<?php
header('Content-Type: application/json');

$_POST_DATA = file_get_contents('php://input');
$_POST_DATA = json_decode($_POST_DATA,true);
?>