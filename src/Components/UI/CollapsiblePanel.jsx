import React from "react";

import "./CollapsiblePanel.css";

export default function CollapsiblePanel({isCollpased, children})
{
    return(
        <div className={isCollpased ? "CollapsiblePanel Collapsed" : "CollapsiblePanel"} >
            { children }
        </div>
    )
}