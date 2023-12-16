import React from "react";
import "./FieldSet.css";

export default function FieldSet({children, Title})
{

    return(
        <fieldset className="FieldSet ModalPanel">
            <legend className="Legend">{Title}</legend>
            {children}
        </fieldset>
    )
}