import React from "react";
import StructureDataTableHeader from "./StructureDataTableHeader";

import "./StructureDataTable.css";

export default function StructureDataTable({rawData})
{

    const data = rawData.map((field)=>
    {
        return(<tr key={field['field']}>
               <td>{field['field']}</td>
               <td>{field['type']}</td>
               <td>{field['nullable']}</td>
               <td>{field['key']}</td>
               <td>{field['default']}</td>
               <td>{field['extra']}</td>
               </tr>);
    });

    return(
        <table className="StructureDataTable">
            <thead>
                <StructureDataTableHeader />
            </thead>
            <tbody>
                { data }
            </tbody>
        </table>
    )
}