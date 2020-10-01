import {Action, combineReducers, createStore} from 'redux';


const USER_LOGGED_IN = 'userLoggedIn';
const USER_LOGGED_OUT = 'userLoggedOut';

function userLoggedInAction() {
    return {type: USER_LOGGED_IN}
}

function userLoggedOutAction() {
    return {type: USER_LOGGED_OUT}
}

function userLoggedIn(state = false, action: Action) {
    switch (action.type) {
        case USER_LOGGED_IN :
            return true;
        case USER_LOGGED_OUT:
            return false;
        default:
            return state;
    }
}

interface userDetailsActions {
    type: string,
    payload: {}
}

function userDetailsAction(userDetails: UserDetails | {}) {
    return {
        type: USER_DETAILS,
        payload: userDetails
    }
}

const USER_DETAILS = 'userDetails';

function userDetails(state = {}, action: userDetailsActions) {
    switch (action.type) {
        case USER_DETAILS:
            return action.payload;
        default:
            return state;
    }
}

interface UserDetails {
    userId: number,
    username: string,
    authority: string,
    exp: string
    authorizationHeader: string
}

export interface ReduxState {
    userLoggedIn: boolean,
    userDetails: UserDetails
}

const rootReducer = combineReducers({userLoggedIn: userLoggedIn, userDetails: userDetails});
// @ts-ignore
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, reduxDevTools);


export {
    store,
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    USER_DETAILS,
    userDetailsAction,
    userLoggedInAction,
    userLoggedOutAction
}
