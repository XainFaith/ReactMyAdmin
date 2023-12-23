import React, { useContext, useEffect } from "react";
import LoadingOverlay from "../UI/LoadingOverlay";
import NavList from "../UI/NavList";
import Button from "../UI/Button";

import useApi from "../../Hooks/useApi";
import useAuthContext from "../../Hooks/useAuthContext";

import "./TablesPanel.css";

export default function TablesPanel()
{
    const access = useAuthContext();
    const [callApi, response, error, awaiting] = useApi('getTableNames.php');

    useEffect(()=>
    {
        if(access.user.selectedDatabase != null)
        {
            callApi();    
        }  
    }
    ,[access.user.selectedDatabase]);

    const onTableSelected = (name)=>
    {
        access.onDatabaseSelected(name);
    }

    const onTablesRefresh = ()=>
    {
        if(access.user.selectedDatabase != null)
        {
            callApi();
        }
    }

    return(
        <div className="TablesPanel">
        <LoadingOverlay isActive={awaiting}>
        <div className="TablesPanelHeader"><h3>Tables:</h3><Button className="TablesRefresh" onClick={onTablesRefresh}/></div>
        <div className="TablesNavContainer">
            {(response && error == null )? <NavList navElements={response.tables} className="TablesNavList" onItemSelected={onTableSelected}/> : "No Tables Avaliable"}
        </div>
        </LoadingOverlay>
    </div>
    );
}