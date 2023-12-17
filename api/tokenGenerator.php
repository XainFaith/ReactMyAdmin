<?php

class TokenGenerator
{
    //Generates a Token for user access
    public function generateToken() 
    {
        $data = md5(uniqid("", true) . microtime);
        return vsprintf('%s-%s-%s-%s-%s-%s', str_split($data, 5));
    }
}

?>