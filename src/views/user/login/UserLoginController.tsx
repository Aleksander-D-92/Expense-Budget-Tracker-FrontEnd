import React from "react";
import {UserLoginForm} from "./UserLoginForm";


function UserLoginController() {
    function handleLogin(data: any) {
        console.log(data);
    }
    return (
        <>
            <UserLoginForm handleLogin={handleLogin}/>
        </>
    )
}

export {UserLoginController}
