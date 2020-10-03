import {gql} from "@apollo/client";
import {FAVORITE_FRAGMENT} from "../fragments/FavoriteFragments";
import {Favorite} from "../../../config/redux/Favorites";
import {FavoriteType} from "../mutations/FavoriteMutations";

export interface AllFavoritesByUserResp {
    allFavoritesByUser: Favorite[]
}

export interface AllFavoritesByUserVars {
    id: number
}

const GET_FAVORITES_BY_USERID = gql`
    query allFavoritesByUser($id: ID) {
        allFavoritesByUser(id: $id) {
            ...favorite
        }
    }
    ${FAVORITE_FRAGMENT}
`

export interface GetFavoritesCountVars {
    id: number
}

export interface GetFavoritesCountResp {
    countFavoriteByUser: FavoriteCount[]
}

interface FavoriteCount {
    count: number,
    favoriteType: FavoriteType
}

const GET_FAVORITES_COUNT_BY_USERID = gql`
    query countFavoriteByUser($id: ID) {
        countFavoriteByUser(id: $id) {
            count
            favoriteType
        }
    }

`
export {GET_FAVORITES_BY_USERID, GET_FAVORITES_COUNT_BY_USERID}
