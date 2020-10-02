import {FavoriteType} from "../../services/apollo/mutations/FavoriteMutations";

const ADD_FAVORITE = 'ADD_FAVORITE';
const DELETE_FAVORITE = 'REMOVE_FAVORITE';

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

function favoritesReducer(state: Favorite[] = [], action: FavoritesAction) {
    switch (action.type) {
        case ADD_FAVORITE:
            return [...state, action.payload]
        case DELETE_FAVORITE:
            return [...state].filter(f => f.favoriteId !== action.payload.favoriteId);
        default:
            return state

    }
}

export {favoritesReducer, addFavoriteAction, deleteFavoriteAction}
