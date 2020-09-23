import React from "react";
import {UserLoginForm} from "./UserLoginForm";
import {useMutation} from "@apollo/client";
import {CREATE_JWT} from "../../../config/apolo/queries/UserQueries";
import {toast, ToastContainer} from 'react-toastify';
import {removeAllCookies} from "../../../shared/utils/cookieUtils";
import {useDispatch} from 'react-redux';
import {USER_DETAILS, USER_LOGGED_IN} from "../../../config/redux/ReduxStore";


function UserLoginController() {
    const [createJWT] = useMutation(CREATE_JWT)
    const dispatch = useDispatch();

    function handleLogin(data: any) {
        createJWT({
            variables: {
                username: data.username,
                password: data.password,
                rememberMe: data.rememberMe
            }
        }).then((e) => {
            updateCookiesAndStore(e.data.createJWT.idToken)
        }).catch(() => {
            toast.error("Invalid Credentials", {
                position: 'bottom-right'
            });

        })
    }

    function updateCookiesAndStore(jwt: string) {
        removeAllCookies();
        document.cookie = `jwt=${jwt}`;
        let jwtPayload = JSON.parse(atob(jwt.split('.')[1])); //parse the JWT payload to JSON object
        console.log(jwtPayload);
        dispatch({type: USER_LOGGED_IN});
        dispatch({
            type: USER_DETAILS,
            payload: {
                userId: jwtPayload.id,
                username: jwtPayload.sub,
                authority: jwtPayload.authorities,
                exp: jwtPayload.exp,
                authorizationHeader: `Bearer ${jwt}`
            }
        })
    }

    return (
        <>
            <UserLoginForm handleLogin={handleLogin}/>
            <ToastContainer/>
        </>
    )
}

export {UserLoginController}
