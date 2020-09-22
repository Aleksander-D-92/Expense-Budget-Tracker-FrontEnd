import React from "react";
import {UserRegisterForm} from "./UserRegisterForm";


function UserRegisterController() {
    function handleRegister(data: any) {
        console.log(data);
    }

    return (
        <>
            <UserRegisterForm handleSubmit={handleRegister}/>
        </>
    )
}

export {UserRegisterController}
