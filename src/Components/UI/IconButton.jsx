import React from "react";

import "./IconButton.css";

export default function IconButton({iconStyle, onClick, className})
{

    const styles = "IconButton" + (className ? " " + className : "") + (iconStyle ? " " + iconStyle : "");

    return(
        <button className={styles} onClick={onClick} />
    )
}