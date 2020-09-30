import React, {useState} from "react";
import {Button, Divider, Drawer, IconButton, List, ListItem} from "@material-ui/core";
import {TopNavSearch} from "./TopNavSearch";
import {Link} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from '@material-ui/icons/Menu';

interface Props {

}

function TopNavDrawer(props: Props) {
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
                        <TopNavSearch drawer={true}/>
                        <Divider/>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export {TopNavDrawer}
