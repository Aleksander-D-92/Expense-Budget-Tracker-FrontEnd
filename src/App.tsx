import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Hidden} from "@material-ui/core";
import {TopNavController} from "./views/top_nav/TopNavController";
import {WebsiteRoutes} from "./config/react-router-dom/WebsiteRoutes";
import {CheckIfLoggedIn} from "./views/user/check-if-logged-in/CheckIfLoggedIn";
import {LeftNavController} from "./views/left_nav/LeftNavController";


function App() {
    return (
        <>
            <CheckIfLoggedIn/>
            <Grid container spacing={0}>
                <Hidden smDown={true}>
                    <Grid item xs={false} md={2}
                          id={'leftNav'}
                    >
                        <LeftNavController/>
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={12} md={10}>
                    <Grid item xs={12} id={'header'}>
                        <TopNavController/>
                    </Grid>
                    <Grid item xs={12} id={'body'}>
                        <WebsiteRoutes/>
                    </Grid>
                    <Grid item xs={12} id={'footer'}>
                        <span>Footer</span>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default App;
