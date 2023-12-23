import React, { useContext, useEffect } from "react";

import useApi from "../../Hooks/useApi";
import useAuthContext from "../../Hooks/useAuthContext";


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

    if(response == null)
    {

    }
    else
    {
        console.log(response);
    }

    return <></>;
}