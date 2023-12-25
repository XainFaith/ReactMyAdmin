import React, { useContext, useEffect, useState } from "react";

import useAuthContext from "../../Hooks/useAuthContext";
import LoadingOverlay from "../UI/LoadingOverlay";
import StructureDataTable from "../StructureDataTable/StructureDataTable";
import OverflowContainer from "../UI/OverflowContainer";

import useApi from "../../Hooks/useApi";
import FieldModifyModal from "./FieldModifyModal";


export default function StructureViewer()
{
    const access = useAuthContext();
    const [callApi, response, error, awaiting] = useApi('getTableStructure.php');
    const [callModifyFieldApi, modifyResponse, modifyError, modifyAwaiting] = useApi('modifyStructureField.php');
    const [modifyPanelVisible, setModifyPanelVisible] = useState(false);
    const [modifyFieldIndex, setModifyFieldIndex] = useState(0);

  

    useEffect(()=>
    {
        if(access.user.selectedTable != null)
        {
            callApi();
        }

    }, [access.user.selectedTable]);

    useEffect(()=>
    {
        if(response != null)
        {
            //When we recieve the tables struture we need to set it in the auth context as other components need to know
            access.onTableStructure(response);
        }

    },[response])

    if(response == null)
    {
        return <></>;
    }

    const onFieldModify = (fieldIndex)=>
    {
        console.log(fieldIndex);
        setModifyFieldIndex(fieldIndex);
        setModifyPanelVisible(true);
    }

    const onRequestFieldModify = ()=>
    {
        setModifyPanelVisible(false);
    }

    const onFieldDrop = (fieldIndex)=>
    {

    }

    const onCancel = ()=>
    {
        setModifyPanelVisible(false);
    }
        
    return(
        <>
            <LoadingOverlay isActive={awaiting}>
                <OverflowContainer>
                    <StructureDataTable rawData={response} onFieldModify={onFieldModify} onFieldDrop={onFieldDrop}/>
                </OverflowContainer>
            </LoadingOverlay>
            {modifyPanelVisible ? <FieldModifyModal isVisible field={response[modifyFieldIndex]} onCancel={onCancel} onFieldModify={onRequestFieldModify} /> : null }
        </>
    );
}