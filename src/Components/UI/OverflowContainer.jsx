import React from "react";

import "./OverflowContainer.css";

export default function OverflowContainer({children})
{
    return(
        <div className="OverflowContainer">
            {children}
        </div>
    );
}