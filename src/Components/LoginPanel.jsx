import React, { useContext, useEffect, useState } from "react";
import ModalPanel from "./UI/ModalPanel";

import axios from "axios";
import LoadingOverlay from "./UI/LoadingOverlay";
import { NotifierContext } from "./Notifier/Notifier";

import useApi from "../Hooks/useApi";
import Button from "./UI/Button";
import useAuthContext from "../Hooks/useAuthContext";

export default function LoginPanel()
{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    
    const notifier = useContext(NotifierContext);
    const userContext = useAuthContext();

    const [ callApi, response, error, awaiting] = useApi('auth.php');

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
        callApi({ "username": username, "password": password });
    }

    //useEffect is used here becuase the response value is not something used directly by the component
    useEffect(()=>
    {
        if(response != null)
        {
            userContext.onGranted(response);
        }

    },[response])

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
                    <Button onClick={onLoginClick}>Login</Button>
                </div>
            </LoadingOverlay>
        </ModalPanel>
    )
}