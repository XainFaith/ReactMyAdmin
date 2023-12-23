import React from "react";
import LoginPanel from "./Components/LoginPanel";

import useAuthContext from "./Hooks/useAuthContext";

export default function NonUserArea()
{
    const accessContext = useAuthContext();

    if(accessContext.user?.authToken == null)
    {
        return (<LoginPanel />);
    }
    
    return null;
}