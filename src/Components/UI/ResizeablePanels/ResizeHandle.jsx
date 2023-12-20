import React, { useEffect, useRef } from "react";

import "./ResizeHandle.css";

export default function ResizeHandle({isVertical=false})
{
    const prevPanelRef = useRef(null);
    const postPanelRef = useRef(null);
    const resizeHandleRef = useRef(null);

    useEffect(() =>
    {
            window.addEventListener("mousemove", (e) => 
            {
                if(prevPanelRef.current != null && postPanelRef.current != null && resizeHandleRef.current != null)
                {
                    if(isVertical)
                    {
                        const parentBounds = prevPanelRef.current.parentElement.getBoundingClientRect();
                        const handleBounds = resizeHandleRef.current.getBoundingClientRect();

                        const prevPanelBounds = prevPanelRef.current.getBoundingClientRect();
                        const postPanelBounds = postPanelRef.current.getBoundingClientRect();

                        const change = e.movementY / 2;

                        const newPrevSize = prevPanelBounds.height + change;
                        const newPostSize = postPanelBounds.height - change;

                        const newPrevPanelSize = (100 * newPrevSize) / (parentBounds.height);
                        const newPostPanelSize = (100 * newPostSize) / (parentBounds.height);

                        prevPanelRef.current.style.height = newPrevPanelSize + '%';
                        postPanelRef.current.style.height = newPostPanelSize +'%';
                    }
                    else
                    {
                        const parentBounds = prevPanelRef.current.parentElement.getBoundingClientRect();
                        const handleBounds = resizeHandleRef.current.getBoundingClientRect();

                        const prevPanelBounds = prevPanelRef.current.getBoundingClientRect();
                        const postPanelBounds = postPanelRef.current.getBoundingClientRect();

                        const change = e.movementX / 2;

                        const newPrevSize = prevPanelBounds.width + change;
                        const newPostSize = postPanelBounds.width - change;

                        const newPrevPanelSize = (100 * newPrevSize) / (parentBounds.width);
                        const newPostPanelSize = (100 * newPostSize) / (parentBounds.width);

                        prevPanelRef.current.style.width = newPrevPanelSize + '%';
                        postPanelRef.current.style.width = newPostPanelSize +'%';
                    }
                }
            }); 

            window.addEventListener("mouseup", () => 
            {
                onResizeEnd();
            });
    },
    []);

    const onResizeStart = function(e)
    {
        const prevPanel = e.target.previousSibling;
        if(prevPanel.classList.contains("ResizeablePanel"))
        {
            prevPanelRef.current = prevPanel;
        }

        const postPanel = e.target.nextSibling;
        if(postPanel.classList.contains("ResizeablePanel"))
        {
            postPanelRef.current = postPanel;
        }    
    }


    const onResizeEnd = function() 
    {
        prevPanelRef.current = null;
        postPanelRef.current = null;
    }

    return(
        <div ref={resizeHandleRef} className={isVertical ? "ResizeHandle Vertical" : "ResizeHandle Horizontal" } onPointerDown={onResizeStart} />
    )
}