import React, {MouseEvent, useState} from "react";
import {TopNav} from "./TopNav";


function TopNavController() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <>
            <TopNav handleClick={handleClick}
                    handleCLose={handleClose}
                    anchorEl={anchorEl}/>
        </>
    )
}

export {TopNavController}
