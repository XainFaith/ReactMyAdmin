import React from "react";

import TabContainer from "../UI/Tab/TabContainer"
import Tab from "../UI/Tab/Tab";
import StructureViewer from "./StructureViewer";

export default function Workspace()
{

    return(
        <TabContainer defaultTab="Structure">
            <Tab name="Structure">
                <StructureViewer />
            </Tab>

            <Tab name="Browse">
            </Tab>

            <Tab name="SQL">
            </Tab>

            <Tab name="Search">
            </Tab>
            
        </TabContainer>
    )

}