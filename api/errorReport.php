<?php

define('SYS_ERROR', 1000);
define('AUTH_ERROR',1001);
define('BAD_REQUEST',2000);


class ErrorReport
{
    public $errorMessage = "unknow error has occured!<br>Please contact administration or Support!";
    public $errorCode;

    public function __construct($message = null, $errorCode= BAD_REQUEST) 
    {
        if($message != null)
        {
            $this->errorMessage = $message;
        }

        $this->errorCode = $errorCode;
    }

    public function stringify()
    {
        return json_encode($this);
    }
}

?>