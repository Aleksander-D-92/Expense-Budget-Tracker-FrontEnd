import React, {useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {userDetailsAction, userLoggedOutAction} from "../../../config/redux/User";

function UserLogoutController() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
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
