<?php

class FieldStructure
{
    public $name;
    public $type;
    public $nullable;
    public $key;
    public $default;
    public $extra;

    public function __construct($fieldDesc)
    {
        $this->name = $fieldDesc['Name'];
        $this->type = $fieldDesc['Type'];
        $this->nullable = $fieldDesc['Null'];
        $this->key = $fieldDesc['Key'];
        $this->default = $fieldDesc['Default'];
        $this->extra = $fieldDesc['Extra'];
    }
}

class TableStructure
{
    private $fields = array();

    public function __construct()
    {

    }

    public function AddField($field)
    {
        $fields = array_push($fields, $field);
    }

    public function stringify()
    {
        return json_encode($this);
    }
}


?>