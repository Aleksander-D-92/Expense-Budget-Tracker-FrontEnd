import {gql} from "@apollo/client";
import {FAVORITE_FRAGMENT} from "../fragments/FavoriteFragments";

const FAVORITE_TYPE = gql`
    enum FavoriteType {
        MOVIE
        TV
        ACTOR
    }
`

export interface CreateFavoriteVars {
    userId: number
    movieDBId: number
    favoriteType: FavoriteType
}

export interface CreateFavoriteResp {
    createFavorite: {
        favoriteId: number
        movieDBId: number
        favoriteType: FavoriteType
    }
}

export enum FavoriteType {
    MOVIE = 'MOVIE', TV = 'TV', ACTOR = 'ACTOR'
}

const CREATE_FAVORITE = gql`
    mutation createFavorite(
        $userId: ID
        $movieDBId: ID
        $favoriteType: FavoriteType
    ) {
        createFavorite(
            form: {
                userId: $userId
                movieDBId: $movieDBId
                favoriteType: $favoriteType
            }
        ) {
            ...favorite
        }
    }
    ${FAVORITE_FRAGMENT}
`

export interface DeleteFavoriteVars {
    favoriteId: number
}

const DELETE_FAVORITE = gql`
    mutation deleteFavorite($favoriteId: ID) {
        deleteFavorite(form: { favoriteId: $favoriteId }) {
            message
        }
    }

`
export {CREATE_FAVORITE, DELETE_FAVORITE, FAVORITE_TYPE}
