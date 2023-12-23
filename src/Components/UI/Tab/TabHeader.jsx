import React, { useState } from "react";

import Button from "../Button";

import "./TabHeader.css";

export default function TabHeader({tabNames, onTabChanged, defaultSelected})
{

    const [selectedTab, setSelectedTab] = useState(defaultSelected);

    function onTabSelected(name)
    {
        console.log(name);
        if(name != selectedTab)
        {
            setSelectedTab(name);
            onTabChanged(name);
        }
    }

    const tabButtons = tabNames.map((name) =>
    {
        return(
        <Button className={(name == selectedTab) ? "TabHeaderItem Selected" : "TabHeaderItem"} key={"tabName" + name} onClick={()=>onTabSelected(name)} isActive={(name == selectedTab)} >
            {name}
        </Button>
        );
    })

    return(
        <div className="TabHeaderContainer">
            {tabButtons}
        </div>
    );

}