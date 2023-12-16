import React from "react";
import ModalPanel from "./Components/UI/ModalPanel";
import LoginPanel from "./Components/LoginPanel";

export default function App()
{
    function onAccessTokenGranted()
    {

    }

    return(<LoginPanel onAccessTokenGranted={onAccessTokenGranted}/>);
}