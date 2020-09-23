import React, {MouseEvent, useState} from "react";
import {TopNav} from "./TopNav";
import {useSelector} from 'react-redux';
import {ReduxState} from "../../config/redux/ReduxStore";

function TopNavController() {
    const state = useSelector((state: ReduxState) => state);
    const loggedIn = state.userLoggedIn;
    const username = state.userDetails.username;
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
                    anchorEl={anchorEl}
                    loggedIn={loggedIn}
                    username={username}/>
        </>
    )
}

export {TopNavController}
