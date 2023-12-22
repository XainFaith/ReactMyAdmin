import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { NotifierContext } from "../Components/Notifier/Notifier";
import { UserAccessContext } from "../Context/AuthUser";

export default function useApi(url)
{
    const notifier = useContext(NotifierContext);
    const authUser = useContext(UserAccessContext);

    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [awaiting, setAwaiting] = useState(false);

    function callApi(data)
    {
        setAwaiting(true);
        setError(null);
        const postData = {...data, 'authToken': authUser.authToken, 'selectedDatabase': authUser.selectedDatabase};

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
            
            if(url == "logout.php")
            {
                authUser.logout();
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