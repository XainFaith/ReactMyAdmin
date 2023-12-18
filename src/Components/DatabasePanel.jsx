import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import LoadingOverlay from "./UI/LoadingOverlay";
import { NotifierContext } from "./Notifier/Notifier";
import {user, UserAccessContext } from "./AuthUser";

import "./DatabasePanel.css";


export default function DatabasePanel()
{
    const authUser = useContext(UserAccessContext);
    const notifier = useContext(NotifierContext);

    const [databases, setDatabases] = useState("");
    const [isAwaiting, setAwaiting] = useState(false);
    
    //Query for Avaliable Databases to user, only happens once after first render
    useEffect(GetAllowedDBNames,[]);


    function GetAllowedDBNames()
    {
        if(isAwaiting == false)
        {
            setAwaiting(true);
            axios.post("./api/getdbnames.php",{
                        "authToken": authUser.authToken }
            ).then((response)=>
            {
                setAwaiting(false);
                //Did we recieve an error report
                if(response.data.errorCode !== undefined)
                {
                    notifier.createError(response.data.errorMessage);
                    return;
                }

                //TODO Update Datebase Names
                
            }).catch((error)=>{
                setAwaiting(false);
                notifier.createError(error.message);
            })
        }
    }


    return(
        <div className="DatabasePanel">
            <LoadingOverlay isActive={isAwaiting}>

            </LoadingOverlay>
        </div>
    );

}