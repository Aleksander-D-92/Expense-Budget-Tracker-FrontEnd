import React, {useState} from "react";
import {Button, Divider, Drawer, IconButton, List, ListItem} from "@material-ui/core";
import {TopNavSearch} from "./TopNavSearch";
import {Link} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';


function TopNavDrawer() {
    const [open, setOpen] = useState<boolean>(false);

    function toggleOpen() {
        setOpen(true)
    }

    function toggleClose() {
        setOpen(false)
    }

    return (
        <>
            <IconButton onClick={toggleOpen}>
                <MenuIcon/>
            </IconButton>
            <Drawer open={open} onClose={toggleClose}>
                <List>
                    <ListItem>
                        <Button color="inherit" component={Link} to={'/'}
                                className={''}>
                            <HomeIcon/>Home
                        </Button>
                        <Divider/>
                    </ListItem>
                    <ListItem>
                        <IconButton onClick={toggleClose} style={{position: 'relative', top: '-60px', left: '280px'}}>
                            <CloseIcon/>
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <TopNavSearch drawer={true}/>
                        <Divider/>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export {TopNavDrawer}
