import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Paper} from "@material-ui/core";
import {TopNavController} from "./views/top_nav/TopNavController";
import {WebsiteRoutes} from "./config/react-router-dom/WebsiteRoutes";
import {CheckIfLoggedIn} from "./views/user/check-if-logged-in/CheckIfLoggedIn";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {purple} from "@material-ui/core/colors";


function App() {
    const theme = createMuiTheme({
        palette: {
            type: "dark",
            primary: purple
        },
        overrides: {
            MuiTooltip: {
                tooltip: {
                    fontSize: "0.9em",
                }
            }
        }
    });
    return (
        <>
            <CheckIfLoggedIn/>
            <ThemeProvider theme={theme}>
                <Paper>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Grid item xs={12} id={'header'}>
                                <TopNavController/>
                            </Grid>
                            <Grid item xs={12} id={'body'}>
                                <WebsiteRoutes/>
                            </Grid>
                            <Grid item xs={12} id={'footer'}>
                                <h1>Footer</h1>
                                {/*<TopNavController/>*/}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </>
    );
}

export default App;
