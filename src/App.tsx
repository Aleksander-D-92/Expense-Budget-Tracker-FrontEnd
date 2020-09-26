import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Hidden, Paper} from "@material-ui/core";
import {TopNavController} from "./views/top_nav/TopNavController";
import {WebsiteRoutes} from "./config/react-router-dom/WebsiteRoutes";
import {CheckIfLoggedIn} from "./views/user/check-if-logged-in/CheckIfLoggedIn";
import {LeftNavController} from "./views/left_nav/LeftNavController";
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {purple} from "@material-ui/core/colors";


function App() {
    const theme = createMuiTheme({
        palette: {
            type: "dark",
            primary: purple
        }
    });
    return (
        <>
            <CheckIfLoggedIn/>
            <ThemeProvider theme={theme}>
                <Paper>
                    <Grid container spacing={0}>
                        <Hidden smDown={true}>
                            <Grid item xs={false} md={1}
                                  id={'leftNav'}
                            >
                                <LeftNavController/>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} sm={12} md={11}>
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
                </Paper>
            </ThemeProvider>
        </>
    );
}

export default App;
