import React, { useState } from "react";

import ModalPanel from '../UI/ModalPanel';
import FieldTypeCombo from "../UI/FieldTypeCombo";
import FieldDefaultCombo from '../UI/FieldDefaultCombo';
import Button from "../UI/Button";
import Checkbox from '../UI/Checkbox';

import './FieldModifyModal.css';


export default function FieldModifyModal({isVisible, field, onFieldModify, onCancel})
{
    const [fieldName, setFieldName] = useState(field['field']);
    const [fieldType, setFieldType] = useState(getFieldType);
    const [fieldLength, setfieldLength] = useState(getFieldLength);
    const [defaultFieldValue, setDefaultFieldValue] = useState(getDefaultValue);
    const [nullableFieldValue, setNullableFieldValue] = useState(getNullable);
    const [autoIncrement, setAutoIncrement] = useState(false);

    console.log(field);

    //Handles edge cases with embedded extra infomation in fields type, eg length
    function getFieldType()
    {
        const rawFieldType = field['type'];
        if(rawFieldType.match("varchar"))
        {   
            return "varchar";
        }

        return rawFieldType;
    }

    //Used to the get the length of a field if it is embedded in the type
    function getFieldLength()
    {
        const rawFieldType = field['type'];
        if(rawFieldType.match('varchar'))
        {
            const length = rawFieldType.replace('varchar\(','').replace('\)','');
            return length;
        }

        return null;
    }

    function getNullable()
    {
        if(field['nullable'] == "NO")
        {
            return false;
        }

        return true;
    }

    function getDefaultValue()
    {
        if(field['default'] == null) return "null";
        else
        return "none";
    }

    return(
        <ModalPanel className="ModifyFieldModal" Title="Modify Field Structure"  isVisible={isVisible}>
            <table>
                <thead>
                    <tr>
                        <th>Name:</th>
                        <th>Type:</th>
                        <th>Length/Values:</th>
                        <th>Default:</th>
                        <th>Null:</th>
                        <th>Auto Increment:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type='text' defaultValue={fieldName}/></td>
                        <td><FieldTypeCombo defaultField={fieldType} /></td>
                        <td><input type='text' defaultValue={fieldLength}/></td>
                        <td><FieldDefaultCombo defaultValue={defaultFieldValue} /> </td>
                        <td><Checkbox defaultValue={nullableFieldValue}/></td>
                        <td><Checkbox defaultValue={autoIncrement}/></td>
                    </tr>
                </tbody>
            </table>
            <div className="FlexRow">
                <Button onClick={()=>{onFieldModify(fieldName, fieldType, fieldLength, defaultFieldValue, nullableFieldValue,autoIncrement)}}>Modify</Button>
                <Button onClick={onCancel} className="UiRowEnd">Cancel</Button>
            </div>
        </ModalPanel>
    )
}