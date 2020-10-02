import {combineReducers, createStore} from 'redux';
import {Favorite, favoritesReducer} from "./Favorites";
import {UserDetails, userDetailsReducer, userLoggedInReducer} from "./User";


export interface ReduxState {
    userLoggedIn: boolean,
    userDetails: UserDetails,
    favorites: Favorite[]
}

const rootReducer = combineReducers({
    userLoggedIn: userLoggedInReducer,
    userDetails: userDetailsReducer,
    favorites: favoritesReducer
});
// @ts-ignore
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, reduxDevTools);


export {store}
