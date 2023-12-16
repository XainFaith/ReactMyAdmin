<?php

class ErrorReport
{
    public $message = "unknow error has occured!<br>Please contact administration or Support!";
    public $errorCode;

    public function __construct($message = null, $errorCode = 1000) 
    {
        if($message != null)
        {
            $this->message = $Message;
        }

        $this->errorCode = $errorCode;
    }

    public function stringify()
    {
        return json_encode($this);
    }
}


?>