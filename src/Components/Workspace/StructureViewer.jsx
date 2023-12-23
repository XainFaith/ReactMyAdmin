import React, { useContext, useEffect } from "react";

import useApi from "../../Hooks/useApi";
import { AuthUserContext } from '../../Context/AuthUser';


export default function StructureViewer()
{
    const authUser = useContext(AuthUserContext);

    const [callApi, response, error, awaiting] = useApi('getTableStructure.php');

    useEffect(()=>
    {
        if(authUser.selectedTable != null)
        {
            callApi();
        }

    }, [authUser]);

    if(response == null)
    {

    }
    else
    {
        console.log(response);
    }

    return <></>;
}