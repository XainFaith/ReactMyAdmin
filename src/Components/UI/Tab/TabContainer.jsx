import React, { useContext, useState } from "react";
import TabHeader from "./TabHeader";

import "./TabContainer.css";

export default function TabContainer({children, defaultTab})
{
    const [selectedTab,setSelectedTab] = useState(defaultTab);

    const tabNames = children.map((tab)=>
    {
        if(tab?.props?.name)
        {
            return tab.props.name;
        }
        return null;
    });

    function onTabChanged(name)
    {
        setSelectedTab(name);
    }

    const tabs = children.map((tab)=>
    {
        if(tab.props.name == selectedTab)
        {
            return <div key={"tab" + tab.props.name} className="Tab">{tab}</div>;
        }
        
        return <div key={"tab" + tab.props.name} className="Tab Hidden">{tab}</div>;
    })

    return(
        <div className="TabContainer">
            <TabHeader tabNames={tabNames} onTabChanged={onTabChanged} defaultSelected={defaultTab} />
            {tabs}
        </div>
    );
}