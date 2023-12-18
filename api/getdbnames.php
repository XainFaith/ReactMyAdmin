<?php
include_once "./api.php";
include_once './userdb.php';
include_once "./errorReport.php";

$pdo = new PDO("mysql:host=localhost", $tokenUser, $accessPwd);
$result = $pdo->query('SHOW DATABASES');

if($result == false)
{
    $errorReport = new ErrorReport("System Error", 3000);
    echo $errorReport->stringify();
    return;
}

$errorReport = new ErrorReport("System Error", 3000);
echo $errorReport->stringify();

/*
echo "[";

while(($dbName = $result->fetchColumn(0)) !== false)
{
    echo $dbName .",";
}

echo "]";
*/

?>