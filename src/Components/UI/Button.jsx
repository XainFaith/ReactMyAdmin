import React from "react";

import "./Button.css";

export default function({className, isActive, onClick, children})
{
    function onButtonClick(e)
    {
        e.target.blur();
        onClick();
    }

    if(children)
    {
        return <button className={className} onClick={onButtonClick}>{children}</button>;
    }

    return <button className={className} onClick={onButtonClick}/>
}