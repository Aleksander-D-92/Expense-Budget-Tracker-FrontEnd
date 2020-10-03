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
import {TvShowDetailsController} from "../../views/tv_show_details/TvShowDetailsController";
import {ActorDetailsController} from "../../views/actor_details/ActorDetailsController";
import {FavoriteController} from "../../views/favorites/FavoriteController";

function WebsiteRoutes() {
    return (
        <Switch>
            <Route exact={true} path={'/'}><LandingPageController/></Route>
            <Route exact={true} path={'/users/login'}>
                {console.log('v rautera sme')}
                <UserLoginController/>
            </Route>
            <Route exact={true} path={'/users/register'}><UserRegisterController/></Route>
            <Route exact={true} path={'/users/logout'}><UserLogoutController/></Route>
            <Route exact={true} path={'/users/account-settings'}><AccountSettingsController/></Route>
            <Route exact={true} path={'/admins/all-users'}><AllUsersController/></Route>
            <Route exact={true} path={'/admins/edit-user/:userId'}><AdminEditUserController/></Route>
            <Route exact={true} path={'/movies/:movieId'}><MovieDetailsController/></Route>
            <Route exact={true} path={'/tv-shows/:tvShowId'}><TvShowDetailsController/></Route>
            <Route exact={true} path={'/actors/:actorId'}><ActorDetailsController/></Route>
            <Route exact={true} path={'/favorites'}><FavoriteController/></Route>
        </Switch>
    )
}

export {WebsiteRoutes}
