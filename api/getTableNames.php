<?php
include_once "./api.php";
include_once './userdb.php';
include_once "./errorReport.php";

if(isset($_POST_DATA['selectedDatabase']))
{
    $dname = $_POST_DATA['selectedDatabase'];
    try{
        $pdo = new PDO("mysql:host=localhost;dbname=$dname", $tokenUser, $accessPwd);
        $result = $pdo->query('SHOW TABLES');

        if($result == false)
        {
            $errorReport = new ErrorReport("System Error", SYS_ERROR);
            echo $errorReport->stringify();
            return;
        }

        echo "{ \"tables\": ";
        $dbTables = array();

        while(($dbTable = $result->fetchColumn(0)) !== false)
        {
            array_push($dbTables, $dbTable);
        }

        echo json_encode($dbTables);

        echo "}";

    }
    catch(PDOException $e)
    {
        $errorReport = new ErrorReport($e->getMessage(), SQL_ERROR);
        echo $errorReport->stringify();
        exit();
    }
}
else
{
    $errorReport = new ErrorReport("System Error", SYS_ERROR);
    echo $errorReport->stringify();
    exit();
}
?>