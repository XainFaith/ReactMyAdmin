import React, { useEffect } from "react";
import LoadingOverlay from "../UI/LoadingOverlay";
import NavList from "../UI/NavList";
import Button from "../UI/Button";
import OverflowContainer from "../UI/OverflowContainer";

import useApi from "../../Hooks/useApi";
import useAuthContext from "../../Hooks/useAuthContext";

import "./DatabasePanel.css";

export default function DatabasePanel()
{
    const access = useAuthContext();

    const [callApi, response, error, awaiting] = useApi('getDBNames.php');

    //Query for Avaliable Databases to user, only happens once after first render
    useEffect(callApi,[]);
    
    const onDatabaseSelected = (name)=>
    {
        access.onDatabaseSelected(name);
    }

    const onDatabasesRefresh = ()=>
    {
        callApi();
    }

    return(
        <LoadingOverlay isActive={awaiting}>
        <div className="DatabasesPanelHeader">
            <h3>Databases:</h3>
            <Button className="DatabaseDrop"/>
            <Button className="DatabaseAdd"/>
            <Button className="DatabaseRefresh" onClick={onDatabasesRefresh}/>
        </div>
        <OverflowContainer>
        <div className="DatabasePanel">
            {response ? <NavList navElements={response.databases} className="DatabaseNavList" onItemSelected={onDatabaseSelected}/> : "No Databases Avaliable"}
        </div>
        </OverflowContainer>
        </LoadingOverlay>
    );

}