<?php

class FieldStructure
{
    public $field;
    public $type;
    public $nullable;
    public $key;
    public $default;
    public $extra;

    public function __construct($fieldDesc)
    {
        $this->field = $fieldDesc['Field'];
        $this->type = $fieldDesc['Type'];
        $this->nullable = $fieldDesc['Null'];
        $this->key = $fieldDesc['Key'];
        $this->default = $fieldDesc['Default'];
        $this->extra = $fieldDesc['Extra'];
    }
}

class TableStructure
{
    public $fields = array();

    public function __construct()
    {

    }

    public function AddField($field)
    {
        array_push($this->fields, $field);
    }

    public function stringify()
    {
        return json_encode($this->fields);
    }
}


?>