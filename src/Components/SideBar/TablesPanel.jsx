import React, { useContext, useEffect } from "react";
import useApi from "../../Hooks/useApi";
import LoadingOverlay from "../UI/LoadingOverlay";
import NavList from "../UI/NavList";
import Button from "../UI/Button";

import { UserAccessContext } from "../../Context/AuthUser";
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

    const onTablesRefresh = ()=>
    {
        if(authUser.selectedDatabase != null)
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