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

echo "{ \"databases\": ";
$dbNames = array();

while(($dbName = $result->fetchColumn(0)) !== false)
{
    array_push($dbNames, $dbName);
}

echo json_encode($dbNames);

echo "}";

?>