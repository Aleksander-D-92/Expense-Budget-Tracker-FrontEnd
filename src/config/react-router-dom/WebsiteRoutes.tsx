import React from "react";
import {useSelector} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
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
import {ReduxState} from "../redux/ReduxStore";

function WebsiteRoutes() {
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const authority = useSelector((state: ReduxState) => state.userDetails.authority);
    const userLoggedIn = useSelector((state: ReduxState) => state.userLoggedIn);
    return (
        <Switch>
            <Route exact={true} path={'/'}>
                <LandingPageController/>
            </Route>
            <Route exact={true} path={'/users/login'}>
                {(userLoggedIn) ? <Redirect to={'/'}/> : <UserLoginController/>}
            </Route>
            <Route exact={true} path={'/users/register'}>
                {(userLoggedIn) ? <Redirect to={'/'}/> : <UserRegisterController/>}
            </Route>
            <Route exact={true} path={'/users/logout'}>
                <UserLogoutController/>
            </Route>
            <Route exact={true} path={'/users/account-settings'}>
                <AccountSettingsController/>
            </Route>
            <Route exact={true} path={'/admins/all-users'}>
                {(authority === ROLE_ADMIN) ? <AllUsersController/> : <Redirect to={'/'}/>}
            </Route>
            <Route exact={true} path={'/admins/edit-user/:userId'}>
                {(authority === ROLE_ADMIN) ? <AdminEditUserController/> : <Redirect to={'/'}/>}
            </Route>
            <Route exact={true} path={'/movies/:movieId'}><MovieDetailsController/></Route>
            <Route exact={true} path={'/tv-shows/:tvShowId'}><TvShowDetailsController/></Route>
            <Route exact={true} path={'/actors/:actorId'}><ActorDetailsController/></Route>
            <Route exact={true} path={'/favorites'}>
                {(userLoggedIn) ? <FavoriteController/> : <Redirect to={'/users/login'}/>}
            </Route>
            <Route path="*">
                <Redirect to={'/'}/>
            </Route>
        </Switch>
    )
}

export {WebsiteRoutes}
