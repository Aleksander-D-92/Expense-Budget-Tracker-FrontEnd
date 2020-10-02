import {Action} from "redux";

const USER_LOGGED_IN = 'userLoggedIn';
const USER_LOGGED_OUT = 'userLoggedOut';

function userLoggedInAction() {
    return {type: USER_LOGGED_IN}
}

function userLoggedOutAction() {
    return {type: USER_LOGGED_OUT}
}

function userLoggedInReducer(state = false, action: Action) {
    switch (action.type) {
        case USER_LOGGED_IN :
            return true;
        case USER_LOGGED_OUT:
            return false;
        default:
            return state;
    }
}

interface UserDetailsAction {
    type: string,
    payload: {}
}

interface UserDetails {
    userId: number,
    username: string,
    authority: string,
    exp: string
    authorizationHeader: string
}

function userDetailsAction(userDetails: UserDetails | {}) {
    return {
        type: USER_DETAILS,
        payload: userDetails
    }
}

const USER_DETAILS = 'userDetails';

function userDetailsReducer(state = {}, action: UserDetailsAction) {
    switch (action.type) {
        case USER_DETAILS:
            return action.payload;
        default:
            return state;
    }
}

export {userLoggedInReducer, userLoggedInAction, userLoggedOutAction, userDetailsReducer, userDetailsAction}
