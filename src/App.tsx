import React, {useEffect} from 'react';
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
import {ThemeBuilder} from "./views/thene/ThemeBuilder";


function App() {
    const darkTheme = useSelector((state: ReduxState) => state.darkTheme);
    const jwt = useSelector((state: ReduxState) => state.userDetails.authorizationHeader);
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

    useEffect(() => {
        //removes the loading screen
        const loadingScreenHtml = document.getElementById('loading screen');
        const loadingScreenCss = document.getElementById('loading screen css');
        if (loadingScreenHtml !== null && loadingScreenCss !== null) {
            loadingScreenHtml.style.display = 'none'
            loadingScreenCss.remove();
        }
    }, [])
    return (
        <>
            <ApolloProvider client={GetClient(jwt)}>
                <CheckIfLoggedIn/>
                <ThemeBuilder/>
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
