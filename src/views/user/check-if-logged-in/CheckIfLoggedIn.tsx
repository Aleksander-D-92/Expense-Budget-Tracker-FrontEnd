import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {userDetailsAction, userLoggedInAction} from "../../../config/redux/ReduxStore";

function CheckIfLoggedIn() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('check if logged in')
        const token = localStorage.getItem('jwt');
        if (token !== null && token !== undefined) {
            let jwtPayload = JSON.parse(atob(token.split('.')[1])); //parse the JWT payload to JSON object
            dispatch(userLoggedInAction());
            dispatch(userDetailsAction({
                    userId: jwtPayload.id,
                    username: jwtPayload.sub,
                    authority: jwtPayload.authorities,
                    exp: jwtPayload.exp,
                    authorizationHeader: `Bearer ${token}`
                }
            ));
        }
    })
    return (
        <>
        </>
    )
}

export {CheckIfLoggedIn}
