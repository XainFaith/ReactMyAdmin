<?php
include_once "./api.php";
include_once "./db.php";
include_once "./tokenGenerator.php";
include_once "./errorReport.php";

if(isset($_POST_DATA['authToken']) || isset($_SESSION['user']) || isset($_SESSION['encpwd']))
{

    $authToken = $_POST_DATA['authToken'];

    $pdo = new PDO("mysql:host=localhost;dbname=$rmadbname", $rmadbUser, $rmadbPass);
    $statment = $pdo->prepare('DELETE FROM access WHERE authToken=:authToken');

    $statment->bindParam('authToken', $authToken);
    
    if($statment->execute() == false)
    {
        $error = new ErrorReport("System Error!", SYS_ERROR);
        echo $error->stringify();
        exit();
    }
    
}

session_destroy();

?>