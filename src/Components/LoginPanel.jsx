import React from "react";
import ModalPanel from "./UI/ModalPanel";


export default function LoginPanel({onAccessTokenGranted})
{
    return(
        <ModalPanel Title="React My Admin">
            <div className="UiSection">
            <p className="UiLabel">User:</p> <input type="text" />
            </div>
            <div className="UiSection">
                <p className="UiLabel">Pass:</p> <input type="password" />
            </div>
            <div className="UiSection">
                <button>Login</button>
            </div>
        </ModalPanel>
    )
}