import React from "react";
import {UserRegisterForm} from "./UserRegisterForm";
import {useMutation} from '@apollo/client';
import {CREATE_USER} from "../../../config/apolo/queries/UserQueries";


function UserRegisterController() {
    const [createUser] = useMutation(CREATE_USER)

    function handleRegister(data: any) {
        createUser({
            variables: {
                username: data.username,
                password: data.password,
                confirmPassword: data.confirmPassword
            }
        }).then((e) => {
            console.log(e);
        })
    }

    return (
        <>
            <UserRegisterForm handleSubmit={handleRegister}/>
        </>
    )
}

export {UserRegisterController}
