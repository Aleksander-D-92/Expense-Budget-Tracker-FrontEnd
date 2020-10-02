import {Action, combineReducers, createStore} from 'redux';
import {FavoriteType} from "../../services/apollo/mutations/FavoriteMutations";


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

interface UserDetailsAction {
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

function userDetails(state = {}, action: UserDetailsAction) {
    switch (action.type) {
        case USER_DETAILS:
            return action.payload;
        default:
            return state;
    }
}

const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

interface FavoritesAction {
    type: string,
    payload: JSON
}

interface Favorite {
    userId: number
    movieDBId: number
    favoriteType: FavoriteType
}

export function addFavoriteAction(newValue: Favorite) {
    return {
        type: ADD_FAVORITE,
        payload: newValue
    }
}

function favoritesReducer(state: Array<JSON> = [], action: FavoritesAction) {
    switch (action.type) {
        case ADD_FAVORITE:
            return [...state, action.payload]
        case REMOVE_FAVORITE:
            let newState = [...state];
            const index = newState.indexOf(action.payload);
            newState.splice(index, 1);
            return newState;
        default:
            return state

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
    userDetails: UserDetails,
    favorites: Favorite[]
}

const rootReducer = combineReducers({
    userLoggedIn: userLoggedIn,
    userDetails: userDetails,
    favorites: favoritesReducer
});
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
