import {gql} from "@apollo/client";

const FAVORITE_FRAGMENT = gql`
    fragment favorite on Favorite {
        favoriteId
        favoriteType
        movieDBId
    }
`
export {FAVORITE_FRAGMENT}
