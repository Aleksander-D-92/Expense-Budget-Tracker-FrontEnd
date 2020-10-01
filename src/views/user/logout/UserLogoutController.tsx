import React, {useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {removeAllCookies} from "../../../shared/utils/cookieUtils";
import {userLoggedOutAction, userDetailsAction} from "../../../config/redux/ReduxStore";

function UserLogoutController() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('logout se izvika');
        dispatch(userLoggedOutAction());
        dispatch(userDetailsAction({}));
        removeAllCookies();
        history.push("/users/login");
    })
    return (
        <>
        </>
    )
}

export {UserLogoutController}
