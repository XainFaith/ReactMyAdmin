<?php
include_once "./api.php";
include_once "./db.php";
include_once "./tokenValidator.php";
include_once "./errorReport.php";


$accessPwd = null;
$tokenUser = null;

if(isset($_POST_DATA['authToken']) == false || isset($_SESSION['user']) == false || isset($_SESSION['encpwd']) == false)
{
    session_abort();
    $report = new ErrorReport();
    echo $report->stringify();
    return;
}
else
{
    $validator = new TokenValidator();
    $authToken = $_POST_DATA['authToken'];
    $tokenUser = $_SESSION['user'];
    $encpwd = $_SESSION['encpwd'];
    
    $result = $validator->validateAuthToken($authToken, $tokenUser, $encpwd, $accessPwd);

    //If result does not match the original access token then an error occured
    if($result != $authToken)
    {
        echo $result->stringify();
        exit();
    }
}

$selectedDbname = null;
$selectedTable = null;

if(isset($_POST_DATA['selectedDatabase']))
{
    $selectedDbname =  $_POST_DATA['selectedDatabase'];
}

if(isset($_POST_DATA['selectedTable']))
{
    $selectedTable = $_POST_DATA['selectedTable'];
}

?>