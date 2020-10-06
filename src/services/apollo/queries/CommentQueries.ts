import {gql} from "@apollo/client";
import {COMMENT_FRAGMENT} from "../fragments/CommentFragments";
import {FavoriteType} from "../mutations/FavoriteMutations";

export interface GetAllCommentsByMovieDBIdVars {
    movieDBId: number,
    favoriteType: FavoriteType
}

export interface GetAllCommentsByMovieDBIdResp {
    allCommentsByMovieDBIdAndFavoriteType: CommentResp[]
}

export interface CommentResp {
    commentId: number
    movieDBId: number
    submitterId: number
    favoriteType: FavoriteType
    title: string
    description: string
    creationDate: Date
}

const GET_ALL_COMMENTS_BY_MOVIE_DB_ID = gql`
    query allCommentsByMovieDBIdAndFavoriteType(
        $movieDBId: Int
        $favoriteType: FavoriteType
    ) {
        allCommentsByMovieDBIdAndFavoriteType(
            movieDBId: $movieDBId
            favoriteType: $favoriteType
        ){
            ...CommentFragment
        }
    }
    ${COMMENT_FRAGMENT}
`
export {GET_ALL_COMMENTS_BY_MOVIE_DB_ID}
