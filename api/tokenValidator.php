<?php
include_once "./api.php";
include "./db.php";
include_once "./errorReport.php";

//Token Validator for API requests, made as a class so it can be extended easily if needed
class TokenValidator
{
    public function validateAuthToken($authToken, $tokenUser, $encpwd, &$accessPwd)
    {
        try
        {
            global $rmadbname;
            global $rmadbUser;
            global $rmadbPass;
            global $extendTime;

            $pdo = new PDO("mysql:host=localhost;dbname=$rmadbname", $rmadbUser, $rmadbPass);
            $statment = $pdo->prepare('SELECT * FROM access WHERE user=:tokenUser');
            $statment->bindParam('tokenUser', $tokenUser);
            if(!$statment->execute())
            {
                $report = new ErrorReport($statment->errorInfo(), SYS_ERROR);
                return $report;
            }

            //Check for results no token for the user was given!
            if($statment->rowCount() <= 0)
            {
                $report = new ErrorReport("Token has Expired!", AUTH_ERROR);
                return $report;
            }

            $tokenInfo = $statment->fetch();
          
            //If the token stored in the system exists but does not match its a bad token
            if($tokenInfo['authToken'] != $authToken)
            {
                $report = new ErrorReport("Token has Expired!", AUTH_ERROR);
                return $report;
            }

            $currentTime = time();
            
            //Has the token expired
            if($tokenInfo['expireTime'] < $currentTime)
            {
                $report = new ErrorReport("Token has Expired!", AUTH_ERROR);
                return $report;
            }

            //Does the clients pwd match 
            $encToken = $tokenInfo['encToken'];

            $c = base64_decode($encpwd);
            $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
            $iv = substr($c, 0, $ivlen);
            $hmac = substr($c, $ivlen, $sha2len=32);
            $ciphertext_raw = substr($c, $ivlen+$sha2len);
            $pwd = openssl_decrypt($ciphertext_raw, $cipher, $encToken, $options=OPENSSL_RAW_DATA, $iv);
            $calcmac = hash_hmac('sha256', $ciphertext_raw, $encToken, $as_binary=true);

            if (hash_equals($hmac, $calcmac) == false)// timing attack safe comparison
            {
                $report = new ErrorReport("System Error!", AUTH_ERROR);
                return $report;
            }

            //Set the out variable
            $accessPwd = $pwd;

            //Token is valid extend token usage time
            $statment = $pdo->prepare("UPDATE access SET expireTime=:newTime  WHERE authToken=:token");
            $statment->bindParam('token', $authToken);
            $extendedTime = $currentTime + $extendTime;
            $statment->bindParam('newTime', $extendedTime);
            if(!$statment->execute())
            {
                $report = new ErrorReport("System Error!", AUTH_ERROR);
                return $report;
            }

            //Close the pdo connection
            $pdo = null;

            return $authToken;
        }
        catch(PDOException $e)
        {
            $report = new ErrorReport("System Error!", SYS_ERROR);
            return $report;
        }
    }
}

?>