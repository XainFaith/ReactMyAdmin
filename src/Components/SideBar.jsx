import React, { useState } from "react";
import CollapsiblePanel from "./UI/CollapsiblePanel";
import IconButton from "./UI/IconButton";
import DatabasePanel from "./DatabasePanel";

import "./SideBar.css";


export default function Sidebar()
{

    const [visiblePanel, setVisiblePanel] = useState("Databases");

    const onButtonClick = (panelName)=>
    {
        if(visiblePanel == panelName) setVisiblePanel("none");
        else
        setVisiblePanel(panelName);
    }

    return(
        <div className="SideBarContainer">
            <div className="SideBarMenu">
                <IconButton iconStyle="DatabaseIcon" className={(visiblePanel == "Databases") ? "Active" : null } onClick={(e)=>{e.target.blur(); onButtonClick("Databases");}} />
                <IconButton iconStyle="TablesIcon" className={(visiblePanel == "Tables") ? "Active" : null } onClick={(e)=>{e.target.blur(); onButtonClick("Tables");}} />
                <IconButton iconStyle="SettingsIcon" className={(visiblePanel == "Settings") ? "Active BottomOfSideBar" : "BottomOfSideBar" } onClick={(e)=>{e.target.blur();onButtonClick("Settings");}} />
                <IconButton iconStyle="LogoutIcon" className={(visiblePanel == "Logout") ? "Active" : null } onClick={(e)=>{e.target.blur(); onButtonClick("Logout");}} />
            </div>
            <CollapsiblePanel isCollpased={(visiblePanel != "Databases")}>
                <DatabasePanel />
            </CollapsiblePanel>

            <CollapsiblePanel isCollpased={(visiblePanel != "Tables")}>

            </CollapsiblePanel>
        </div>
    )
}