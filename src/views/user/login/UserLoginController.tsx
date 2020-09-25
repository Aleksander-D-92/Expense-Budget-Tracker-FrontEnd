import React, {MouseEvent, useEffect} from "react";
import {UserLoginForm} from "./UserLoginForm";
import {useMutation} from "@apollo/client";
import {toast, ToastContainer} from 'react-toastify';
import {removeAllCookies} from "../../../shared/utils/cookieUtils";
import {useDispatch} from 'react-redux';
import {USER_DETAILS, USER_LOGGED_IN} from "../../../config/redux/ReduxStore";
import {CREATE_JWT, CreateJWTResp, CreateJWTVars} from "../../../config/apolo/mutations/UserMutations";
import {DemoLogin} from "./DemoLogin";
import {Grid} from "@material-ui/core";
import {ADMIN_CREDENTIALS, FREE_USER_CREDENTIALS, PAID_USER_CREDENTIALS} from "./variables";
import {useHistory} from 'react-router-dom';


function UserLoginController() {
    const [createJWT, {data, loading}] = useMutation<CreateJWTResp, CreateJWTVars>(CREATE_JWT)
    const dispatch = useDispatch();
    const history = useHistory();

    function handleLogin(formData: any) {
        createJWT({
            variables: {
                username: formData.username,
                password: formData.password,
                rememberMe: formData.rememberMe
            }
        }).catch((err) => {
            toast.error(err.graphQLErrors[0].message, {
                position: 'bottom-right'
            });

        })
    }

    function handleDemoLogin(target: MouseEvent<HTMLButtonElement>) {
        let credentials = {
            username: '',
            password: '',
            rememberMe: true
        };
        switch (target.currentTarget.name) {
            case 'paid_login':
                credentials = PAID_USER_CREDENTIALS;
                break;
            case 'free_login':
                credentials = FREE_USER_CREDENTIALS;
                break;
            case 'admin_login':
                credentials = ADMIN_CREDENTIALS;
                break;
        }
        createJWT({
            variables: {
                username: credentials.username,
                password: credentials.password,
                rememberMe: credentials.rememberMe
            }
        }).catch((err) => {
            toast.error(err.graphQLErrors[0].message, {
                position: 'bottom-right'
            });
        })

    }

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
        });
        history.push("/")
    }

    return (
        <>
            <Grid container spacing={3} justify="center">
                <DemoLogin handleDemoLogin={handleDemoLogin}
                           loading={loading}/>
                <UserLoginForm handleLogin={handleLogin}
                               loading={loading}/>
            </Grid>
            <ToastContainer/>
        </>
    )
}

export {UserLoginController}
