import React from "react";
import StructureDataTableHeader from "./StructureDataTableHeader";
import Button from '../UI/Button';

import "./StructureDataTable.css";

export default function StructureDataTable({rawData, onFieldModify, onFieldDrop})
{

    const data = rawData.map((field, index)=>
    {
        return(<tr key={field['field']}>
               <td>{field['field']}</td>
               <td>{field['type']}</td>
               <td>{field['nullable']}</td>
               <td>{field['key']}</td>
               <td>{field['default']}</td>
               <td>{field['extra']}</td>
               <td className="StructureActionField">
                    <Button onClick={()=>{onFieldModify(index)}}>Modify</Button>
                    <Button onClick={()=>{onFieldDrop(index)}}>Drop</Button>
               </td>
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