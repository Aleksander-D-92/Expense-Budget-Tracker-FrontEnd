import React, {MouseEvent} from "react";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import {AppBar, Button, Hidden, IconButton, Menu, MenuItem, Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import {TopNavSearch} from "./TopNavSearch";
import {TopNavDrawer} from "./TopNavDrawer";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';


interface Props {
    handleCLose: Function
    handleClick: Function
    anchorEl: null | HTMLElement
    loggedIn: boolean,
    username: string,
    authority: string
}

function TopNav(props: Props) {
    return (
        <>
            <AppBar position={'sticky'} style={{height: '70px'}} color={'inherit'}>
                <Toolbar>
                    <Hidden mdUp={true}>
                        <TopNavDrawer/>
                    </Hidden>
                    <Hidden smDown={true}>
                        <Button color="inherit" component={Link} to={'/'}
                                className={''}>
                            <HomeIcon/>Home
                        </Button>
                        <TopNavSearch drawer={false}/>
                    </Hidden>

                    <Hidden smDown={true}>
                        {props.loggedIn ?
                            <>
                                {props.authority === 'ROLE_ADMIN' &&
                                <Button color="inherit" component={Link}
                                        to={'/admins/all-users'}
                                        className={'ml-auto'}>
                                    <PeopleAltIcon/>Manage Users
                                </Button>
                                }
                                <Button color="inherit" component={Link} to={'/favorites'}
                                        className={''}>
                                    <CollectionsBookmarkIcon/>Favorites
                                </Button>
                                <Button color="inherit" component={Link} to={'/users/account-settings'}
                                        className={''}>
                                    <AccountCircleIcon/>Account Settings
                                </Button>
                                <Button color="inherit" component={Link}
                                        to={'/users/logout'}><ExitToAppIcon/>Logout
                                </Button>
                            </>
                            :
                            <>
                                <Button color="inherit" component={Link} to={'/users/login'} className={'ml-auto'}>
                                    <PersonIcon/>Login
                                </Button>
                                <Button color="inherit" component={Link} to={'/users/register'}>
                                    <PersonAddIcon/>Register
                                </Button>
                            </>
                        }
                    </Hidden>
                    <Hidden mdUp={true}>
                        <IconButton color="inherit" onClick={(e: MouseEvent) => props.handleClick(e)}
                                    className={'ml-auto'}>
                            <MoreVertIcon/>
                        </IconButton>
                    </Hidden>
                </Toolbar>

                <Menu
                    color={'inherit'}
                    id="simple-menu"
                    anchorEl={props.anchorEl}
                    keepMounted
                    open={Boolean(props.anchorEl)}
                    onClose={() => props.handleCLose()}
                >
                    {props.loggedIn ?
                        <>
                            {props.authority === 'ROLE_ADMIN' &&
                            <MenuItem component={Link} to={'/admins/all-users'}
                                      onClick={() => props.handleCLose()}>
                                <PeopleAltIcon/>Manage Users
                            </MenuItem>
                            }
                            <MenuItem component={Link} to={'/favorites'}
                                      onClick={() => props.handleCLose()}>
                                <CollectionsBookmarkIcon/>Favorites
                            </MenuItem>
                            <MenuItem component={Link} to={'/users/account-settings'}
                                      onClick={() => props.handleCLose()}>
                                <AccountCircleIcon/>Account Settings
                            </MenuItem>
                            <MenuItem component={Link} to={'/users/logout'} onClick={() => props.handleCLose()}>
                                <ExitToAppIcon/>Logout
                            </MenuItem>
                        </>
                        :
                        <>
                            <MenuItem component={Link} to={'/users/login'} onClick={() => props.handleCLose()}>
                                <PersonIcon/>Login
                            </MenuItem>
                            <MenuItem component={Link} to={'/users/register'} onClick={() => props.handleCLose()}>
                                <PersonAddIcon/>Register
                            </MenuItem>
                        </>
                    }
                </Menu>
            </AppBar>
        </>
    )
}

export {TopNav}
