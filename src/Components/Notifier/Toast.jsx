import React, { useEffect, useState } from "react";
import Button from "../UI/Button";

export default function Toast({children, className, onRemove, autoClose=true, data})
{
    const [isClosing, setIsClosing] = useState(false);

    const timeToDelete = 300;
    const timeToAutoClose = 1000 * 10;

    
    useEffect(()=>
    {
        if(isClosing)
        {
            const timeId = setTimeout(onRemove,timeToDelete);

            return ()=>{
                clearTimeout(timeId);
            }
        }
    },[isClosing, onRemove]);

    useEffect(()=>
    {
        if(autoClose)
        {
            const timeID = setTimeout(()=> setIsClosing(true), timeToAutoClose);

            return ()=>{
                clearTimeout(timeID);
            }
        }
    },[autoClose]);


    function onClose()
    {
        setIsClosing(true);
    }

    const classes = "Toast " + className + (isClosing ? " SlideOut" : " SlideIn");

    return(
        <div className={classes} datakey={data}>
            <div>
                {children}
            </div>
            <Button className="CloseButton" onClick={onClose}>X</Button>
        </div>
    );
}