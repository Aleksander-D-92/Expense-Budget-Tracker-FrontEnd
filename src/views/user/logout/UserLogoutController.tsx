import React, {useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {userDetailsAction, userLoggedOutAction} from "../../../config/redux/ReduxStore";

function UserLogoutController() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('logout se izvika');
        dispatch(userLoggedOutAction());
        dispatch(userDetailsAction({}));
        localStorage.removeItem('jwt')
        history.push("/users/login");
    })
    return (
        <>
        </>
    )
}

export {UserLogoutController}
