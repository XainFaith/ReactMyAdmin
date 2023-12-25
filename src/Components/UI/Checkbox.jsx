import React from "react";

import './Checkbox.css';


export default function Checkbox({defaultValue, onClick, className})
{

    return(<input type='checkbox' className={className ? "Checkbox " + className : "Checkbox"} onClick={onClick} defaultValue={defaultValue}/>);
}