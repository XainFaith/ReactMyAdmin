import React, { useContext } from "react";
import { AuthUserContext } from "../Context/AuthUser";

export default function useAuthContext()
{
    const context = useContext(AuthUserContext);

    if(context === undefined)
    {
        throw new Error("Auth user context used outside of its provider");
    }

    return context;
}