import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { NotifierContext } from "../Components/Notifier/Notifier";
import { AuthUserContext } from "../Context/AuthUser";
import useAuthContext from "./useAuthContext";

export default function useApi(url)
{
    const notifier = useContext(NotifierContext);
    const access = useAuthContext();

    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [awaiting, setAwaiting] = useState(false);

    function callApi(data)
    {
        setAwaiting(true);
        setError(null);
        const postData = {...data, 'authToken': access.user.authToken, 'selectedDatabase': access.user.selectedDatabase, 'selectedTable': access.user.selectedTable};

        axios.post('./api/' + url,postData).then((resp)=>
        {
            setAwaiting(false);
            if(resp.data.errorCode !== undefined)
            {
                //Code 1001 is an auth error user no longer is valid 
                if(resp.data.errorCode == 1001)
                {
                    if(authUser.logout)
                    {
                        authUser.logout();
                    }
                }
                
                notifier.createError(resp.data.errorMessage);
                setError(resp.data.errorCode);
                return;
            }
            
            setResponse(resp.data);
        }).catch((error)=>
        {
            setAwaiting(false);
            notifier.createError(error.message);
        })
        
    }

    return [callApi, response, error, awaiting];
}