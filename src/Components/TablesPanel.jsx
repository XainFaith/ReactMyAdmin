import React, { useContext, useEffect } from "react";
import useApi from "../Hooks/useApi";
import LoadingOverlay from "./UI/LoadingOverlay";
import NavList from "./UI/NavList";

import { UserAccessContext } from "./AuthUser";
import "./TablesPanel.css";

export default function TablesPanel()
{
    const authUser = useContext(UserAccessContext);
    const [callApi, response, error, awaiting] = useApi('getTableNames.php');

    useEffect(()=>
    {
        if(authUser.selectedDatabase != null)
        {
            callApi();    
        }  
    }
    ,[authUser.selectedDatabase]);

    const onTableSelected = (name)=>
    {

    }

    return(
        <div className="TablesPanel">
        <LoadingOverlay isActive={awaiting}>
        <div className="TablesPanelHeader">Tables:</div>
        <div className="TablesNavContainer">
            {(response && error == null )? <NavList navElements={response.tables} className="TablesNavList" onItemSelected={onTableSelected}/> : "No Tables Avaliable"}
        </div>
        </LoadingOverlay>
    </div>
    );
}