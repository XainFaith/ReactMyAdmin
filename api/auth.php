<?php
include_once "./api.php";
include_once "./db.php";
include_once "./tokenGenerator.php";
include_once "./errorReport.php";

if(isset($_POST_DATA['username']) == false || isset($_POST_DATA['password']) == false)
{
    $errorReport = new ErrorReport("Bad Request!", 2000);
    echo $errorReport->stringify();
    return;
}

$user = $_POST_DATA['username'];
$pass = $_POST_DATA['password'];

try
{
    //Attempt connection using the provided username and password from the user
    $pdo = new PDO("mysql:host=localhost", $user, $pass);
    $pdo = null;
    //If pdo did not throw an exception user access is valid
    session_start();

    $_SESSION['user'] = $user;
        
    //Generate User Token
    $tokenGenerator = new TokenGenerator();
    $userToken = $tokenGenerator->generateToken();
    $pwdToken = $tokenGenerator->generateToken();
    
    $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
    $iv = openssl_random_pseudo_bytes($ivlen);
    $ciphertext_raw = openssl_encrypt($pass, $cipher, $pwdToken, $options=OPENSSL_RAW_DATA, $iv);
    $hmac = hash_hmac('sha256', $ciphertext_raw, $pwdToken, $as_binary=true);
    $ciphertext = base64_encode( $iv.$hmac.$ciphertext_raw );

    //Set the enc pass for the user in the session
    $_SESSION['encpwd'] = $ciphertext;

    $pdo = new PDO("mysql:host=localhost;dbname=$rmadbname", $rmadbUser, $rmadbPass);
    $statment = $pdo->prepare("INSERT INTO access (authToken, user, expireTime, encToken) VALUES (:authToken, :user, :expireTime, :encToken)");
    
    $statment->bindParam('authToken', $userToken);
    $statment->bindParam('user', $user);

    $expireTime = (time() + extendTime);
    $statment->bindParam('expireTime', $expireTime);
    $statment->bindParam('encToken', $pwdToken);
    if($statment->execute() == false)
    {
        $errorReport = new ErrorReport("System Error", 2002);
        echo $errorReport->stringify();
        return;
    }

    echo json_encode($userToken);
}
catch(PDOException $e)
{
    $errorReport = new ErrorReport("Bad Username Or Password!", 2001);
    echo $errorReport->stringify();
    return;
}

?>