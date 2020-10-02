import {FavoriteType} from "../../services/apollo/mutations/FavoriteMutations";

const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

interface FavoritesAction {
    type: string,
    payload: JSON
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

function deleteFavoriteAction() {

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

export {favoritesReducer, addFavoriteAction}
