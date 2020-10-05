import {combineReducers, createStore} from 'redux';
import {Favorite, favoritesReducer} from "./Favorites";
import {UserDetails, userDetailsReducer, userLoggedInReducer} from "./User";
import {favoriteViewReducer, FavoriteVIewState} from "./FavoriteVIew";
import {themeReducer} from "./UsersTheme";


export interface ReduxState {
    userLoggedIn: boolean,
    userDetails: UserDetails,
    favorites: Favorite[],
    favoritesView: FavoriteVIewState,
    darkTheme: boolean
}

const rootReducer = combineReducers({
    userLoggedIn: userLoggedInReducer,
    userDetails: userDetailsReducer,
    favorites: favoritesReducer,
    favoritesView: favoriteViewReducer,
    darkTheme: themeReducer
});
// @ts-ignore
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, reduxDevTools);


export {store}
