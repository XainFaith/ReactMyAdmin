import React, { useState } from "react";

import useApi from "../Hooks/useApi";

export default function TablesPanel()
{
    const [tableNames, setTableNames] = useState([]);

    const [callApi, response, error, awaiting] = useApi('getTables.php');

    return(
     null
    );
}