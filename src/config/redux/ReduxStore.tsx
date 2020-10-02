import {combineReducers, createStore} from 'redux';
import {Favorite, favoritesReducer} from "./Favorites";
import {userDetailsReducer, userLoggedInReducer} from "./User";
import {UserDetails} from "../../services/apollo/queries/UserQueries";


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
