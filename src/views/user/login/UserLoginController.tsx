import React, {useEffect} from "react";
import {UserLoginForm} from "./UserLoginForm";
import {useMutation} from "@apollo/client";
import {toast, ToastContainer} from 'react-toastify';
import {removeAllCookies} from "../../../shared/utils/cookieUtils";
import {useDispatch} from 'react-redux';
import {USER_DETAILS, USER_LOGGED_IN} from "../../../config/redux/ReduxStore";
import {CREATE_JWT, CreateJWTResp, CreateJWTVars} from "../../../config/apolo/queries/UserMutations";


function UserLoginController() {
    const [createJWT, {data, error, loading}] = useMutation<CreateJWTResp, CreateJWTVars>(CREATE_JWT)
    const dispatch = useDispatch();

    function handleLogin(formData: any) {
        createJWT({
            variables: {
                username: formData.username,
                password: formData.password,
                rememberMe: formData.rememberMe
            }
        }).catch(() => {
            toast.error("Invalid Credentials", {
                position: 'bottom-right'
            });

        })
    }

    useEffect(() => {
        console.log(loading)
    }, [loading])

    useEffect(() => {
        if (data !== undefined && data !== null) {
            updateCookiesAndStore(data.createJWT.idToken)
        }
    }, [data])

    function updateCookiesAndStore(jwt: string) {
        removeAllCookies();
        document.cookie = `jwt=${jwt}`;
        let jwtPayload = JSON.parse(atob(jwt.split('.')[1])); //parse the JWT payload to JSON object
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
