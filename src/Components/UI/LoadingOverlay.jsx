import React from "react";
import "./LoadingOverlay.css";

export default function LoadingOverlay({isActive, children})
{

    const overlay = isActive ? <div className="LoadingOverlay"><img className="LoadingIcon"/></div> : null;

    return(
        <div className="OverlayContainer">
            <div>
                {children}
            </div>
            {overlay}
        </div>
    )

}