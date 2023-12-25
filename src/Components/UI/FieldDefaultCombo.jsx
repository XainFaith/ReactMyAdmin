import React from "react";


export default function FieldDefaultCombo({onValueChange, defaultValue})
{

    return(
        <select onChange={onValueChange} defaultValue={defaultValue}>
            <option value='none'>NONE</option>
            <option>As Defined:</option>
            <option value='null'>NULL</option>
            <option>CURRENT_TIMESTAMP</option>
        </select>
    )
}