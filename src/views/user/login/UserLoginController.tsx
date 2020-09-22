import React from "react";
import {UserLoginForm} from "./UserLoginForm";
import {useMutation} from "@apollo/client";
import {CREATE_JWT} from "../../../config/apolo/queries/UserQueries";
import {ToastContainer, toast} from 'react-toastify';


function UserLoginController() {
    const [createJWT] = useMutation(CREATE_JWT)

    function handleLogin(data: any) {
        createJWT({
            variables: {
                username: data.username,
                password: data.password,
                rememberMe: data.rememberMe
            }
        }).then((e) => {
            console.log(e);
        }).catch((e) => {
            toast.error("Invalid Credentials", {
                position: 'bottom-right'
            });
            console.log(e);
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
