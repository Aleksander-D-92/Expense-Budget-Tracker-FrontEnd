import {gql} from "@apollo/client";
import {FAVORITE_FRAGMENT} from "../fragments/FavoriteFragments";
import {Favorite} from "../../../config/redux/Favorites";

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
export {GET_FAVORITES_BY_USERID}
