import React, { useContext, useEffect } from "react";

import useAuthContext from "../../Hooks/useAuthContext";
import LoadingOverlay from "../UI/LoadingOverlay";
import StructureDataTable from "../StructureDataTable/StructureDataTable";
import OverflowContainer from "../UI/OverflowContainer";

import useApi from "../../Hooks/useApi";


export default function StructureViewer()
{
    const access = useAuthContext();

    const [callApi, response, error, awaiting] = useApi('getTableStructure.php');

  

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

        
    return(
        <LoadingOverlay isActive={awaiting}>
            <OverflowContainer>
                <StructureDataTable rawData={response} />
            </OverflowContainer>
        </LoadingOverlay>
    );
}