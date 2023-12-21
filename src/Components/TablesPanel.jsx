import React, { useState } from "react";

import useApi from "../Hooks/useApi";

export default function TablesPanel()
{
    const [tableNames, setTableNames] = useState([]);

    const [response, error, awaiting, callApi] = useApi('getTables.php');

    return(
    
    );
}