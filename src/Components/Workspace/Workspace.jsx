import React from "react";

import TabContainer from "../UI/Tab/TabContainer"
import Tab from "../UI/Tab/Tab";

export default function Workspace()
{

    return(
        <TabContainer defaultTab="Browse">
            <Tab name="Browse">

            </Tab>
            <Tab name="Structure">

            </Tab>
            <Tab name="SQL">

            </Tab>
            <Tab name="Search">

            </Tab>
        </TabContainer>
    )

}