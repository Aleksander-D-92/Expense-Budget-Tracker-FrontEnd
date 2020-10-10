import React, {useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {userDetailsAction, userLoggedOutAction} from "../../../config/redux/User";
import {deleteAllFavoritesAction} from "../../../config/redux/Favorites";
import {setLightTheme} from "../../../config/redux/UsersTheme";

function UserLogoutController() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(deleteAllFavoritesAction());
        dispatch(userLoggedOutAction());
        dispatch(userDetailsAction({}));
        dispatch(deleteAllFavoritesAction());
        dispatch(setLightTheme());
        localStorage.removeItem('jwt')
        history.push("/users/login");
    })
    return (
        <>
        </>
    )
}

export {UserLogoutController}
