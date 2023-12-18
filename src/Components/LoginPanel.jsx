import React, { useContext, useState } from "react";
import ModalPanel from "./UI/ModalPanel";

import axios from "axios";
import LoadingOverlay from "./UI/LoadingOverlay";
import { NotifierContext } from "./Notifier/Notifier";


export default function LoginPanel({onGranted})
{

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [awaiting, setAwaiting] = useState(false);

    const notifier = useContext(NotifierContext);

    function onUsernameChange(e)
    {
        setUsername(e.target.value);
    }

    function onPasswordChange(e)
    {
        setPassword(e.target.value);
    }

    function onLoginClick()
    {
        setAwaiting(true);
        axios.post("./api/auth.php",{
                    "username": username, 
                    "password": password }
        ).then((response)=>
        {
            setAwaiting(false);
            //Did we recieve an error report
            if(response.data.errorCode !== undefined)
            {
                notifier.createError(response.data.errorMessage);
                return;
            }

            //Else wise it is an access token for the user
            onGranted(response.data);
            
        }).catch((error)=>{
            setAwaiting(false);
            notifier.createError(error.message);
        })
    }

    return(
        <ModalPanel Title="React My Admin">
            <LoadingOverlay isActive={awaiting}>
                <form>
                    <div className="UiSection">
                    <p className="UiLabel">User:</p> <input type="text"  onChange={onUsernameChange}/>
                    </div>
                    <div className="UiSection">
                        <p className="UiLabel" >Pass:</p> <input type="password" onChange={onPasswordChange} autoComplete="off" />
                    </div>
                </form>
                <div className="UiSection">
                    <button onClick={onLoginClick}>Login</button>
                </div>
            </LoadingOverlay>
        </ModalPanel>
    )
}