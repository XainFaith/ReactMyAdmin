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

    const onPromptLogout = ()=>
    {

    }

    return(
        <div className="SideBarContainer">
            <div className="SideBarMenu">
                <input type="radio" name="menuHeader" className="DatabaseIcon" onChange={()=>onButtonClick("Databases")} checked={visiblePanel == "Databases"} />
                <input type="radio" name="menuHeader" className="TablesIcon" onChange={()=>onButtonClick("Tables")} checked={visiblePanel == "Tables"} />
                <input type="radio" name="menuHeader" className="SettingsIcon BottomOfSideBar" onChange={()=>onButtonClick("Settings")} checked={visiblePanel == "Settings"} />
                <input type="radio" name="menuHeader" className="LogoutIcon" onChange={onPromptLogout} checked={false} />
            </div>
            <CollapsiblePanel isCollpased={(visiblePanel != "Databases")}>
                <DatabasePanel />
            </CollapsiblePanel>

            <CollapsiblePanel isCollpased={(visiblePanel != "Tables")}>

            </CollapsiblePanel>
        </div>
    )
}