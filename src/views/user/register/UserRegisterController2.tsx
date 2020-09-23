import React, {useEffect} from "react";
import {UserRegisterForm} from "./UserRegisterForm";
import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import {CREATE_USER, CreateUserVars} from "../../../config/apolo/queries/UserMutations";
import {Dummy} from "../../../config/apolo/queries/Shared";

function UserRegisterController() {
    const [createUser, {data, loading}] = useMutation<Dummy, CreateUserVars>(CREATE_USER)
    const history = useHistory();
    useEffect(() => {
        console.log(loading)
    }, [loading])

    function handleRegister(formData: any) {
        createUser({
            variables: {
                username: formData.username,
                password: formData.password,
                confirmPassword: formData.confirmPassword
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
