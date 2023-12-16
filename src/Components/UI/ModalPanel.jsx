import React from "react";
import "./ModalPanel.css";

export default function ModalPanel({children, Title})
{
    return( 
            <div className="Overlay">
                <div className="ModalContainer">
                    <div className="ModalHeader"><h2>{Title}</h2></div>
                    <div className="ModalPanel">
                        {children}
                    </div>
                </div>
            </div>);
}