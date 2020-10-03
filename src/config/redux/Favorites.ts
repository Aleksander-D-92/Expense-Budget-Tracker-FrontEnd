import {FavoriteType} from "../../services/apollo/mutations/FavoriteMutations";

const ADD_FAVORITE = 'ADD_FAVORITE';
const DELETE_FAVORITE = 'REMOVE_FAVORITE';
const DELETE_ALL_FAVORITE = 'DELETE_ALL_FAVORITE';

interface FavoritesAction {
    type: string,
    payload: Favorite
}

export interface Favorite {
    favoriteId: number
    movieDBId: number
    favoriteType: FavoriteType
}

function addFavoriteAction(newValue: Favorite) {
    return {
        type: ADD_FAVORITE,
        payload: newValue
    }
}

function deleteFavoriteAction(favorite: Favorite) {
    return {
        type: DELETE_FAVORITE,
        payload: favorite
    }
}

function deleteAllFavoritesAction() {
    return {
        type: DELETE_ALL_FAVORITE,
        payload: {}
    }
}

function favoritesReducer(state: Favorite[] = [], action: FavoritesAction) {
    switch (action.type) {
        case ADD_FAVORITE:
            const newState = [...state];
            if (newState.find(f => f.favoriteId == action.payload.favoriteId) === undefined) {
                return [...newState, action.payload]
            } else {
                return [...newState]
            }
        case DELETE_FAVORITE:
            return [...state].filter(f => f.favoriteId !== action.payload.favoriteId);
        case DELETE_ALL_FAVORITE:
            return []
        default:
            return state

    }
}

export {favoritesReducer, addFavoriteAction, deleteFavoriteAction, deleteAllFavoritesAction}
