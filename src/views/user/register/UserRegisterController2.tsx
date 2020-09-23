import React from "react";
import {UserRegisterForm} from "./UserRegisterForm";
import {useMutation} from '@apollo/client';
import {CREATE_USER} from "../../../config/apolo/queries/UserQueries";
import {useHistory} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";

function UserRegisterController() {
    const [createUser] = useMutation(CREATE_USER)
    const history = useHistory();

    function handleRegister(data: any) {
        createUser({
            variables: {
                username: data.username,
                password: data.password,
                confirmPassword: data.confirmPassword
            }
        }).then(() => {
            history.push("/users/login")
        }).catch(() => {
            toast.error("User with this username all ready exists", {
                position: 'bottom-right'
            });
        })
    }

    return (
        <>
            <UserRegisterForm handleSubmit={handleRegister}/>
            <ToastContainer/>
        </>
    )
}

export {UserRegisterController}
