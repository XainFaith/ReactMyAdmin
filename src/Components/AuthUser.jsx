import React, { createContext } from "react";

export const user =
{
    authToken: null,
    privileges: [],
    selectedDatabase: null
}

export const UserAccessContext = createContext(null);