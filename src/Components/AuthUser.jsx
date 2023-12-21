import React, { createContext } from "react";

export const user =
{
    authToken: null,
    privileges: [],
    selectedDatabase: null,
    onTokenExipre: ()=>
    {
        authToken = null;
    }
}

export const UserAccessContext = createContext(user);