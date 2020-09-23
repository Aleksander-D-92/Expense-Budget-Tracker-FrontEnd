import React, {useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {removeAllCookies} from "../../../shared/utils/cookieUtils";
import {USER_DETAILS, USER_LOGGED_OUT} from "../../../config/redux/ReduxStore";

function UserLogoutController() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: USER_LOGGED_OUT});
        dispatch({type: USER_DETAILS, payload: {}});
        removeAllCookies();
        history.push("/users/login");
    })
    return (
        <>
        </>
    )
}

export {UserLogoutController}
