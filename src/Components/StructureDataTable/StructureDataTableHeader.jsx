import React from "react";

import "./StructureDataTableHeader.css";

export default function StructureDataTableHeader()
{
 
    return(
        <tr className="StructureDataTableHeader">
            <th>Field:</th>
            <th>Type:</th>
            <th>Null:</th>
            <th>Key:</th>
            <th>Default:</th>
            <th>Extra:</th>
            <th>Actions:</th>
        </tr>
    );
}