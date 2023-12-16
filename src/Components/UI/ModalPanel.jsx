import React from "react";
import FieldSet from "./FieldSet";
import "./ModalPanel.css";

export default function ModalPanel({children, Title})
{
    return( 
            <div className="Overlay">
                <div className="ModalContainer">
                    <FieldSet Title={Title}>
                        {children}
                    </FieldSet>
                </div>
            </div>);
}