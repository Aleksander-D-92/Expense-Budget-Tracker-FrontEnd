import React, {MouseEvent} from "react";
import MenuIcon from '@material-ui/icons/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import {AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";

interface Props {
    handleCLose: Function
    handleClick: Function
    anchorEl: null | HTMLElement
}

function TopNav(props: Props) {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit" onClick={(e: MouseEvent) => props.handleClick(e)}><MenuIcon/></Button>
                    <Button color="inherit"> <PersonIcon/>Login</Button>
                    <Button color="inherit"> <PersonAddIcon/>Register</Button>
                    <Button color="inherit"> <AccountCircleIcon/>Account Settings</Button>
                    <Button color="inherit"> <ExitToAppIcon/>Logout</Button>
                </Toolbar>
                <Menu
                    id="simple-menu"
                    anchorEl={props.anchorEl}
                    keepMounted
                    open={Boolean(props.anchorEl)}
                    onClose={() => props.handleCLose()}
                >
                    <MenuItem onClick={() => props.handleCLose()}><PersonIcon/>Login</MenuItem>
                    <MenuItem onClick={() => props.handleCLose()}><PersonAddIcon/>Register</MenuItem>
                    <MenuItem onClick={() => props.handleCLose()}><AccountCircleIcon/>Account Settings</MenuItem>
                    <MenuItem onClick={() => props.handleCLose()}><ExitToAppIcon/>Logout</MenuItem>
                </Menu>
            </AppBar>
        </>
    )
}

export {TopNav}
