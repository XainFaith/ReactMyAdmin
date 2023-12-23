<?php
include_once "./api.php";
include_once './userdb.php';
include_once "./errorReport.php";

include_once "./tableStructure.php";

if(isset($_POST_DATA['tableName']))
{

    $tableName = $_POST_DATA['tableName'];

    $pdo = new PDO("mysql:host=localhost", $tokenUser, $accessPwd);
    
    $statment = $pdo->prepare('DESCRIBE :tableName');
    $statment->bindParam('tableName', $tableName);

    if($statment->execute() == false)
    {
        $errorReport = new ErrorReport("Failed to retreieve table descriptior!", SYS_ERROR);
        echo $errorReport->stringify();
        exit();
    }

    if($statment->rowCount() > 0)
    {
        $errorReport = new ErrorReport("Failed to retreieve table descriptior!, No Descriptor ?", SQL_ERROR);
        echo $errorReport->stringify();
        exit();
    }

    $tableStructure = new TableStructure();
    
    while($row = $statment->fetch(PDO::FETCH_LAZY))
    {
        $tableStructure->AddField(new FieldStructure($row));
    }

    echo $tableStructure->stringify();
}

?>