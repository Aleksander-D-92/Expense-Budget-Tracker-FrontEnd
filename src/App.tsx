import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Hidden, Typography} from "@material-ui/core";
import {TopNavController} from "./views/top_nav/TopNavController";
import {WebsiteRoutes} from "./config/react-router-dom/WebsiteRoutes";

function App() {
    return (
        <>
            <Grid container spacing={0}>
                <Hidden xsDown={true}>
                    <Grid item xs={false} sm={1} md={2}
                          id={'leftNav'}
                    >
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={11} md={10}>
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
