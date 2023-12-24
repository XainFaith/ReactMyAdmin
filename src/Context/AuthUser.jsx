import React, { createContext, useCallback, useMemo, useState } from "react";

export const access =
{
    authToken: null,
    privileges: [],
    selectedDatabase: null,
    selectedTable: null,
    tableStructure: null
}

export const AuthUserContext = createContext();

export default function UserAccessProvider({children})
{  
    const [user, setAuthUser] = useState(access);

    const onGranted = (token)=>
    {
        setAuthUser({...user, authToken: token});
    };

    const onLogout =()=>
    {
        setAuthUser({...user, authToken: null, selectedDatabase: null, selectedTable: null, privileges: [], tableStructure: null});
    };

    const onDatabaseSelected = (name)=>
    {
        setAuthUser({...user, selectedDatabase: name});
    };

    const onTableSelected = (name)=>
    {
        setAuthUser({...user, selectedTable: name});
    };

    const onTableStructure = (tlbStructure) =>
    {
        setAuthUser({...user, tableStructure: tlbStructure});
    }


    const contextValue = useMemo(()=>(
        {user,
         onGranted, 
         onLogout,
         onDatabaseSelected,
         onTableSelected,
         onTableStructure
        }), [user]);

    return(
        <AuthUserContext.Provider value={contextValue}>
            {children}
        </AuthUserContext.Provider>
    )
}