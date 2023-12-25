import React from "react";


export default function FieldTypeCombo({onFieldTypeChange, defaultField})
{

    return(
        <select defaultValue={defaultField} onChange={()=>{onFieldTypeChange(e.target.value)}}>
            <option>INT</option>
            <option>VARCHAR</option>
            <option>TEXT</option>
            <option>DATE</option>
            <optgroup label="Numeric">
                <option>TINYINT</option>
                <option>SMALLINT</option>
                <option>MEDIUMINT</option>
                <option>INT</option>
                <option>BIGINT</option>
                <option>DECIMAL</option>
                <option>FLOAT</option>
                <option>DOUBLE</option>
                <option>REAL</option>
                <option>BIT</option>
                <option>BOOLEAN</option>
                <option>SERIAL</option>
            </optgroup>
            
            <optgroup label="Data and Time">
                <option>DATE</option>
                <option>DATETIME</option>
                <option>TIMESTAMP</option>
                <option>TIME</option>
                <option>YEAR</option>
            </optgroup>

            <optgroup label="String">
                <option>CHAR</option>
                <option>VARCHAR</option>
                <option>TINYTEXT</option>
                <option>TEXT</option>
                <option>MEDIUMTEXT</option>
                <option>LONGTEXT</option>
                <option>BINARY</option>
                <option>VARBINARY</option>
                <option>TINYBLOB</option>
                <option>MEDIUMBLOB</option>
                <option>BLOB</option>
                <option>LONGBLOB</option>
                <option>ENUM</option>
                <option>SET</option>
            </optgroup>

            <optgroup label="Spatial">
                <option>GEOMETRY</option>
                <option>POINT</option>
                <option>LINESTRING</option>
                <option>POLYGON</option>
                <option>MULTIPOINT</option>
                <option>MULTILNESTRING</option>
                <option>MULTIPOLYGON</option>
                <option>GEMETRYCOLLECTION</option>
            </optgroup>

            <optgroup label="JSON">
                <option>JSON</option>
            </optgroup>

        </select>
    )    
}
