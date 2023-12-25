import React from "react";
import FieldSet from "./FieldSet";
import "./ModalPanel.css";

export default function ModalPanel({children, Title, isVisible=false, className})
{
    if(isVisible == false) return;

    return( 
            <div className="Overlay">
                <div className={className ? "ModalContainer " + className : "ModalContainer"}>
                    <FieldSet Title={Title}>
                        {children}
                    </FieldSet>
                </div>
            </div>);
}