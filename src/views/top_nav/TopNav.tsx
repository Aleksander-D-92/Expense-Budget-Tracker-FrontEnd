import React, {MouseEvent} from "react";
import MenuIcon from '@material-ui/icons/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import {AppBar, Button, Menu, MenuItem, Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";

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
                    <Button color="inherit" onClick={(e: MouseEvent) => props.handleClick(e)}><MenuIcon/></Button>
                    <Button color="inherit" component={Link} to={'/users/login'}><PersonIcon/>Login</Button>
                    <Button color="inherit" component={Link} to={'/users/register'}><PersonAddIcon/>Register</Button>
                    <Button color="inherit" component={Link} to={'/users/account-settings'}><AccountCircleIcon/>Account
                        Settings</Button>
                    <Button color="inherit" component={Link} to={'/users/logout'}><ExitToAppIcon/>Logout</Button>
                </Toolbar>
                <Menu
                    color={'inherit'}
                    id="simple-menu"
                    anchorEl={props.anchorEl}
                    keepMounted
                    open={Boolean(props.anchorEl)}
                    onClose={() => props.handleCLose()}
                >
                    <MenuItem component={Link} to={'/users/login'} onClick={() => props.handleCLose()}>
                        <PersonIcon/>Login
                    </MenuItem>
                    <MenuItem component={Link} to={'/users/register'} onClick={() => props.handleCLose()}>
                        <PersonAddIcon/>Register
                    </MenuItem>
                    <MenuItem component={Link} to={'/users/account-settings'} onClick={() => props.handleCLose()}>
                        <AccountCircleIcon/>Account Settings
                    </MenuItem>
                    <MenuItem component={Link} to={'/users/logout'} onClick={() => props.handleCLose()}>
                        <ExitToAppIcon/>Logout
                    </MenuItem>
                </Menu>
            </AppBar>
        </>
    )
}

export {TopNav}
