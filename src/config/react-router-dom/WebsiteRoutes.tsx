import React from "react";
import {Route, Switch} from "react-router-dom";
import {UserRegisterController} from "../../views/user/register/UserRegisterController2";
import {UserLoginController} from "../../views/user/login/UserLoginController";
import {UserLogoutController} from "../../views/user/logout/UserLogoutController";
import {AccountSettingsController} from "../../views/user/account-settings/AccountSettingsController";
import {AllUsersController} from "../../views/admin/all-users/AllUsersController";
import {AdminEditUserController} from "../../views/admin/edit-user/AdminEditUserController";
import {LandingPageController} from "../../views/landing_page/LandingPageController";
import {MovieDetailsController} from "../../views/movie_details/MovieDetailsController";

function WebsiteRoutes() {
    return (
        <Switch>
            <Route exact={true} path={'/'}><LandingPageController/></Route>
            <Route exact={true} path={'/users/login'}><UserLoginController/></Route>
            <Route exact={true} path={'/users/register'}><UserRegisterController/></Route>
            <Route exact={true} path={'/users/logout'}><UserLogoutController/></Route>
            <Route exact={true} path={'/users/account-settings'}><AccountSettingsController/></Route>
            <Route exact={true} path={'/admins/all-users'}><AllUsersController/></Route>
            <Route exact={true} path={'/admins/edit-user/:userId'}><AdminEditUserController/></Route>
            <Route exact={true} path={'/movies/:movieId'}><MovieDetailsController/></Route>
        </Switch>
    )
}

export {WebsiteRoutes}
