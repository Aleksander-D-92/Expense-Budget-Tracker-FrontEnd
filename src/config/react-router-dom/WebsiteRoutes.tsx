import React from "react";
import {Switch, Route} from "react-router-dom";
import {UserRegisterController} from "../../views/user/register/UserRegisterController2";
import {UserLoginController} from "../../views/user/login/UserLoginController";
import {UserLogoutController} from "../../views/user/logout/UserLogoutController";
import {AccountSettingsController} from "../../views/user/account-settings/AccountSettingsController";
import {AllUsersController} from "../../views/admin/AllUsersController";

function WebsiteRoutes() {
    return (
        <Switch>
            <Route exact={true} path={'/users/login'}><UserLoginController/></Route>
            <Route exact={true} path={'/users/register'}><UserRegisterController/></Route>
            <Route exact={true} path={'/users/logout'}><UserLogoutController/></Route>
            <Route exact={true} path={'/users/account-settings'}><AccountSettingsController/></Route>
            <Route exact={true} path={'/users/logout'}>Logout</Route>
            <Route exact={true} path={'/admins/all-users'}><AllUsersController/></Route>
        </Switch>
    )
}

export {WebsiteRoutes}
