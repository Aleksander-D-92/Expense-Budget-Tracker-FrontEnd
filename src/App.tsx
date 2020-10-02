import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Paper} from "@material-ui/core";
import {TopNavController} from "./views/top_nav/TopNavController";
import {WebsiteRoutes} from "./config/react-router-dom/WebsiteRoutes";
import {CheckIfLoggedIn} from "./views/user/check-if-logged-in/CheckIfLoggedIn";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Footer} from "./views/footer/Footer";
import {GetClient} from "./services/apollo/ApoloConfig";
import {ApolloProvider} from "@apollo/client";
import {useSelector} from "react-redux";
import {ReduxState} from "./config/redux/ReduxStore";


function App() {
    const jwt = useSelector((state: ReduxState) => state.userDetails.authorizationHeader);
    console.log(jwt);
    const theme = createMuiTheme({
        palette: {
            type: "dark",
            // primary: purple
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
            <ApolloProvider client={GetClient(jwt)}>
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
                                    <Footer/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </ThemeProvider>
            </ApolloProvider>
        </>
    );
}

export default App;
