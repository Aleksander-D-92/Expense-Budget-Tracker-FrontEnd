import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {readCookieByKeyName} from "../../../shared/utils/cookieUtils";
import {userDetailsAction, userLoggedInAction} from "../../../config/redux/ReduxStore";

function CheckIfLoggedIn() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log()
        const token = readCookieByKeyName('jwt');
        if (token !== null) {
            let jwtPayload = JSON.parse(atob(token.split('.')[1])); //parse the JWT payload to JSON object
            dispatch(userDetailsAction({
                    userId: jwtPayload.id,
                    username: jwtPayload.sub,
                    authority: jwtPayload.authorities,
                    exp: jwtPayload.exp,
                    authorizationHeader: `Bearer ${token}`
                }
            ))
            dispatch(userLoggedInAction())
        }
    }, [])
    return (
        <>
        </>
    )
}

export {CheckIfLoggedIn}
