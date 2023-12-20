import React, { useState, useEffect, useRef } from "react";

import "./ResizeablePanel.css";

export default function ResizeablesPanel({children, defaultSize='50%', isVertical=false})
{
  
    return(
        <div  className={isVertical ? "ResizeablePanel Vertical" : "ResizeablePanel Horizontal" } style={ isVertical ? {height: defaultSize} : {width: defaultSize}}>
            {children}
        </div>
    );
}