import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Collapse, Hidden, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';


interface Props {
    authority: string
}

function LeftNav(props: Props) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItem button component={Link} to={'/'} className={'mb-5'}>
                    <ListItemIcon>
                        <HomeIcon style={{fontSize: '40'}}/>
                    </ListItemIcon>
                    <Hidden smDown={true}>
                        <ListItemText primary="Expense tracker"/>
                    </Hidden>
                </ListItem>

                <ListItem button component={Link} to={'/admins/all-users'}>
                    <ListItemIcon>
                        <PeopleAltIcon/>
                    </ListItemIcon>
                    <Hidden smDown={true}>
                        <ListItemText primary="Manage User Roles"/>
                    </Hidden>
                </ListItem>

                <ListItem button component={Link} to={'/bank-accounts'}>
                    <ListItemIcon>
                        <AccountBalanceWalletIcon/>
                    </ListItemIcon>
                    <Hidden smDown={true}>
                        <ListItemText primary="Bank Accounts"/>
                    </Hidden>
                </ListItem>

                <ListItem button component={Link} to={'/categories'}>
                    <ListItemIcon>
                        <SendIcon/>
                    </ListItemIcon>
                    <Hidden smDown={true}>
                        <ListItemText primary="Categories"/>
                    </Hidden>
                </ListItem>

                <ListItem button component={Link} to={'/transactions'}>
                    <ListItemIcon>
                        <SendIcon/>
                    </ListItemIcon>
                    <Hidden smDown={true}>
                        <ListItemText primary="Transactions"/>
                    </Hidden>
                </ListItem>

                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <Hidden smDown={true}>
                        <ListItemText primary="Inbox"/>

                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </Hidden>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button>
                            <ListItemIcon>
                                <StarBorder/>
                            </ListItemIcon>
                            <ListItemText primary="Starred"/>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </>
    )
}

export {LeftNav}
