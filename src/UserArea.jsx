import React from "react";

import Sidebar from "./Components/SideBar/SideBar";
import ResizeablePanel from "./Components/UI/ResizeablePanels/ResizeablePanel";
import ResizeHandle from "./Components/UI/ResizeablePanels/ResizeHandle";
import Workspace from "./Components/Workspace/Workspace";

import useAuthContext from "./Hooks/useAuthContext";

export default function UserArea()
{
    const accessContext = useAuthContext();

    if(accessContext.user.authToken != null)
    {
        return(
            <div className='WorkSpace'>
                <Sidebar />
                <div className="SubSpace">
                    <ResizeablePanel isVertical={true} defaultSize="70%">
                        <Workspace />
                    </ResizeablePanel>
                    <ResizeHandle isVertical={true}/>
                    <ResizeablePanel isVertical={true} defaultSize="30%">
                    </ResizeablePanel>
                </div>
            </div>
        )
    }
    
    return null;
}