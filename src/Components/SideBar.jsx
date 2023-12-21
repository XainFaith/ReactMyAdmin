import React, { useState } from "react";
import CollapsiblePanel from "./UI/CollapsiblePanel";
import DatabasePanel from "./DatabasePanel";
import useApi from "../Hooks/useApi";

import "./SideBar.css";
import TablesPanel from "./TablesPanel";


export default function Sidebar()
{

    const [visiblePanel, setVisiblePanel] = useState("Databases");
    const [callApi] = useApi('logout.php');

    const onButtonClick = (panelName)=>
    {
        if(visiblePanel == panelName) 
        {
            setVisiblePanel("none");
        }
        else
        {
            setVisiblePanel(panelName);
        }
    }

    const onPromptLogout = ()=>
    {
        callApi();
    }

    return(
        <div className="SideBarContainer">
            <div className="SideBarMenu">
                <input type="checkbox" className="DatabaseIcon" onChange={()=>onButtonClick("Databases")} checked={visiblePanel == "Databases"} />
                <input type="checkbox" className="TablesIcon" onChange={()=>onButtonClick("Tables")} checked={visiblePanel == "Tables"} />
                <input type="checkbox" className="SettingsIcon BottomOfSideBar" onChange={()=>onButtonClick("Settings")} checked={visiblePanel == "Settings"} />
                <button className="LogoutIcon" onClick={onPromptLogout} />
            </div>
            <CollapsiblePanel isCollpased={(visiblePanel != "Databases")}>
                <DatabasePanel />
            </CollapsiblePanel>

            <CollapsiblePanel isCollpased={(visiblePanel != "Tables")}>
                <TablesPanel />
            </CollapsiblePanel>
        </div>
    )
}