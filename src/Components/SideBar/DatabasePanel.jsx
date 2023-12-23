import React, { useContext, useEffect } from "react";
import useApi from "../../Hooks/useApi";
import LoadingOverlay from "../UI/LoadingOverlay";
import NavList from "../UI/NavList";
import Button from "../UI/Button";

import { UserAccessContext } from "../../Context/AuthUser";

import "./DatabasePanel.css";


export default function DatabasePanel()
{
    const authUser = useContext(UserAccessContext);

    const [callApi, response, error, awaiting] = useApi('getDBNames.php');

    //Query for Avaliable Databases to user, only happens once after first render
    useEffect(callApi,[]);
    
    const onDatabaseSelected = (name)=>
    {
        authUser.selectedDatabase = name;
    }

    const onDatabasesRefresh = ()=>
    {
        callApi();
    }

    return(
        <div className="DatabasePanel">
            <LoadingOverlay isActive={awaiting}>
            <div className="DatabasesPanelHeader"><h3>Databases:</h3><Button className="DatabaseRefresh" onClick={onDatabasesRefresh}/></div>
            <div className="DatabaseNavContainer">
                {response ? <NavList navElements={response.databases} className="DatabaseNavList" onItemSelected={onDatabaseSelected}/> : "No Databases Avaliable"}
            </div>
            </LoadingOverlay>
        </div>
    );

}