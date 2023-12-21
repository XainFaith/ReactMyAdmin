import React, { createContext } from "react";

export const user =
{
    authToken: null,
    privileges: [],
    selectedDatabase: null,
    logout: null
}

export const UserAccessContext = createContext(user);