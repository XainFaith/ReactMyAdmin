import React from "react";
import "./FieldSet.css";

export default function FieldSet({children, Title, className})
{
    return(
        <fieldset className={ className ? ("FieldSet " + className) : "FieldSet" }>
            <legend className="Legend">{Title}</legend>
            {children}
        </fieldset>
    )
}