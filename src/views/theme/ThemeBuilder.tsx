import React, {useEffect, useState} from "react";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import './ThemeBuilder.css'
import {IconButton, Paper, Tooltip} from "@material-ui/core";
import {DARK_THEME, setDarkTheme, setLightTheme} from "../../config/redux/UsersTheme";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../config/redux/ReduxStore";


function ThemeBuilder() {
    const dispatch = useDispatch();
    const darkTheme = useSelector((state: ReduxState) => state.darkTheme);
    const userDetails = useSelector((state: ReduxState) => state.userDetails);
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        if (userDetails.authority === 'ROLE_USER_FREE' || userDetails.authority === undefined) {
            dispatch(setLightTheme());
            setDisabled(true);
        } else {
            let item = localStorage.getItem('theme');
            if (item === DARK_THEME) {
                dispatch(setDarkTheme());
            } else {
                dispatch(setLightTheme());
            }
            setDisabled(false);
        }
    }, [dispatch, userDetails])

    return (
        <>
            <Tooltip title={(disabled) ? 'Only For Paid Account or Admin' : "Toggle dark/light theme"}>
                <Paper className={'theme-paper'} elevation={15}>
                    <IconButton style={{padding: '5px'}} disabled={disabled}>
                        {darkTheme ?
                            <Brightness7Icon style={{fontSize: '60px'}} onClick={() => dispatch(setLightTheme())}/>
                            :
                            <Brightness4Icon style={{fontSize: '60px'}} onClick={() => dispatch(setDarkTheme())}/>
                        }
                    </IconButton>
                </Paper>
            </Tooltip>
        </>
    )
}

export {ThemeBuilder}
