import React, { createContext, useState, useRef } from "react";

import ToastContainer from "./ToastContainer";
import Toast from "./Toast";

import "./Notifier.css";

export const NotifierContext = createContext(null);

export default function Notifier({children})
{

    const [toasts,setToasts] = useState([]);
    const toastCount = useRef(0);


    function removeNotification(id)
    {
        const idKey = id;
        const filteredToasts = toasts.filter((el)=>{return el.id !== idKey;});
        setToasts(filteredToasts);
    }
    
    function createNotifcation(type, notification)
    {
        let key = toastCount.current;
        toastCount.current++;
        
        switch(type)
        {
            case "Info": case "Success": 
                    setToasts(toasts.concat({id: key, className: type, autoClose: true, children: notification}));
                break;

            case "Error": case "Warning":
                    setToasts(toasts.concat({id: key, className: type, autoClose: false, children: notification}));
                    break;
    
            default:
                throw Error("Unknow or missing toast type: " + action.type);
        }
    }

    const notifierDispatcher = 
    {
        createInfo: (notification)=>
        {
            createNotifcation("Info",notification);
        },        
        createError: (notification)=>
        {
            createNotifcation("Error",notification);
        },        
        createWarning: (notification)=>
        {
            createNotifcation("Warning",notification);
        },        
        createSuccess: (notification)=>
        {
            createNotifcation("Success",notification);
        },                
    }

    const curToasts = toasts.map(({id, ...props})=>{
        return(
            <Toast key={id} onRemove={()=>removeNotification(id)} {...props} />
        );
    });

    return(
        <NotifierContext.Provider value={notifierDispatcher}>

            { children }

            <ToastContainer>
                {curToasts}
            </ToastContainer>
                        
        </NotifierContext.Provider>
    )

}