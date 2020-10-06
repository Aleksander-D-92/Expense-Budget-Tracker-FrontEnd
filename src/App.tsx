import React, {useEffect, useState} from 'react';
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
import {ThemeBuilder} from "./views/theme/ThemeBuilder";
import {Theme} from "@material-ui/core/styles/createMuiTheme";


function App() {
    const jwt = useSelector((state: ReduxState) => state.userDetails.authorizationHeader);
    const darkTheme = useSelector((state: ReduxState) => state.darkTheme);
    const defaultTHeme = createMuiTheme({
        palette: {
            type: "light",
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
    const [currentTheme, setCurrentTheme] = useState<Theme>();

    useEffect(() => {
        if (darkTheme) {
            setCurrentTheme(createMuiTheme({
                palette: {
                    type: "dark",
                    primary: {
                        main: '#90caf9'
                    },
                    secondary: {main: '#00e676'}
                    // primary: purple
                },
                overrides: {
                    MuiTooltip: {
                        tooltip: {
                            fontSize: "0.9em",
                        }
                    }
                }
            }));
        } else {
            setCurrentTheme(createMuiTheme({
                palette: {
                    type: "light",
                    // primary: purple
                },
                overrides: {
                    MuiTooltip: {
                        tooltip: {
                            fontSize: "0.9em",
                        }
                    }
                }
            }));
        }

    }, [darkTheme])
    useEffect(() => {
        //removes the loading screen, we have to use document.getElementById, because it is outside of ReactDOM
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
                <ThemeProvider theme={(currentTheme === undefined) ? defaultTHeme : currentTheme}>
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
