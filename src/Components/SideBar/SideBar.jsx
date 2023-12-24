import React, { useState } from "react";

import CollapsiblePanel from "../UI/CollapsiblePanel";
import DatabasePanel from "./DatabasePanel";
import TablesPanel from "./TablesPanel";

import useApi from "../../Hooks/useApi";

import "./SideBar.css";
import Button from "../UI/Button";
import useAuthContext from "../../Hooks/useAuthContext";
import ModalPanel from "../UI/ModalPanel";

export default function Sidebar()
{
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const [visiblePanel, setVisiblePanel] = useState("Databases");
    const access = useAuthContext();
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
        setLogoutModalVisible(true);
    }

    return(
        <div className="SideBarContainer">
            <div className="SideBarMenu">
                <input type="checkbox" className="DatabaseIcon" onChange={()=>onButtonClick("Databases")} checked={visiblePanel == "Databases"} />
                <input type="checkbox" className="TablesIcon" onChange={()=>onButtonClick("Tables")} checked={visiblePanel == "Tables"} />
                <input type="checkbox" className="SettingsIcon BottomOfSideBar" onChange={()=>onButtonClick("Settings")} checked={visiblePanel == "Settings"} />
                <Button className="LogoutIcon" onClick={onPromptLogout} />
            </div>
            <CollapsiblePanel isCollpased={(visiblePanel != "Databases")}>
                <DatabasePanel />
            </CollapsiblePanel>

            <CollapsiblePanel isCollpased={(visiblePanel != "Tables")}>
                <TablesPanel />
            </CollapsiblePanel>

            <ModalPanel Title="Confirm Logout" isVisible={logoutModalVisible}>
                <div className="FlexRow LogoutModalContent">
                    <Button onClick={()=>{ callApi(); access.onLogout();}}>Logout</Button>
                    <Button onClick={()=>setLogoutModalVisible(false)}>Cancel</Button>
                </div>
            </ModalPanel>
        </div>
    )
}