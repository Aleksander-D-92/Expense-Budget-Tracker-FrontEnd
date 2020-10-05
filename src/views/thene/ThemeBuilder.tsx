import React from "react";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import './ThemeBuilder.css'
import {Paper, Tooltip} from "@material-ui/core";
import {setDarkTheme, setLightTheme} from "../../config/redux/UsersTheme";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../config/redux/ReduxStore";


function ThemeBuilder() {
    const dispatch = useDispatch();
    const darkTheme = useSelector((state: ReduxState) => state.darkTheme)
    return (
        <>
            <Paper className={'theme-paper'} elevation={15}>
                <Tooltip title="Toggle dark/light theme">
                    {darkTheme ?
                        <Brightness7Icon style={{fontSize: '50px'}}
                                         onClick={() => dispatch(setLightTheme())}/>
                        :
                        <Brightness4Icon style={{fontSize: '50px'}}
                                         onClick={() => dispatch(setDarkTheme())}/>
                    }
                </Tooltip>
            </Paper>
        </>
    )
}

export {ThemeBuilder}
