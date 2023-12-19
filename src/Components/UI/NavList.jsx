import React, { useState } from "react";

import "./NavList.css";

export default function NavList({navElements, onItemSelected, className})
{
    const [navItemSelected , setNavItemSelected] = useState(null);

    if(navElements === undefined || navElements === null) return;

    function onNavItemSelected(name)
    {
        setNavItemSelected(name);
        onItemSelected(name);
    }

    const navItems = navElements.map((name)=>{

        if(name == navItemSelected)
        {
            return <li key={name} className="Selected" onClick={()=>onNavItemSelected(name)}>{name}</li>;
        }
        else   
        {
            return <li key={name} onClick={()=>onNavItemSelected(name)}>{name}</li>;
        }
        
    });

    console.log(navItems);

    return(
        <ul className={className ? "NavList " + className : "NavList"}>
            { navItems }
        </ul>
    )
}